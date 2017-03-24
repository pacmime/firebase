(function(angular) {
    
    "use strict";

    angular.module("sob-character")

    .directive('items', ['$timeout', '$uibModal', function($timeout, $uibModal) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/items/items.html',
            
            controller: function($scope, $element) {

                function update() {
                    var weight=0, darkstone=0;
                    angular.forEach($scope.character.items, function(item) {
                        weight += item.weight||0;
                        darkstone += item.darkstone||0;
                    });
                    $scope.itemWeight = weight;
                    $scope.itemDarkstone = darkstone;
                }
                
                $scope.character.$loaded().then(update);

                /**
                 * fired when user changes a clothing slot
                 */
                $scope.onClothingChange = function(slot) {

                    var name = $scope.character.clothing[slot] ? $scope.character.clothing[slot].name : null;
                    angular.forEach($scope.character.items, function(item) {
                
                        //mark item selected as selected
                        if(name && item.slot === slot && item.name === name) {
                            item.equipped = true;
                        } else if(item.slot === slot) {
                            item.equipped = false;
                        }
                    });

                    // console.log(JSON.stringify($scope.character.clothing[slot]));
                    $scope.onSave();
                };

                $scope.getClothingOptions = function(slot) {

                    var options = [];
                    angular.forEach($scope.character.items, function(item) {
                        if(slot === item.slot)
                            options.push(angular.copy(item));
                    });
                    return options;
                };


                $scope.needsMigration = function() {

                    if(typeof($scope.character.version) === 'number') {
                        return $scope.character.version < 4;
                    } else {
                        return $scope.character.version && $scope.character.version.split('.')[0]*1 < 4;   // 'x.y.z'
                    }
                };

                $scope.migrateClothing = function() {
                    angular.forEach($scope.character.clothing, function(clothing, slot) {
                        console.log("Checking " + clothing.name);
                        if(!$scope.character.items[clothing.name]) {
                            console.log("Migrating " + clothing.name);
                            //set slot
                            clothing.slot = slot;
                            //update keywords to mention slot
                            clothing.keywords = clothing.keywords || "Clothing";
                            if(clothing.keywords.toLowerCase().indexOf(slot)<0)
                                clothing.keywords += ", " + slot;
                            $scope.character.items[clothing.name] = clothing;

                        } else {
                            console.log("Already an item");
                        }
                    });
                    $scope.character.version = 4;
                    $scope.onSave();
                };

                if($scope.needsMigration()) {
                    console.log("Migrating clothing automatically");
                    $scope.migrateClothing();
                }


                $scope.onEdited = function(name, item) {

                    //if deleting item or renaming it
                    if(!item || (item.name && item.name !== name)) {
                        delete $scope.character.items[name];

                        if(item && item.name)
                            name = item.name;
                    }

                    if(item)
                        $scope.character.items[name] = item;

                    $scope.onSave();
                    update();
                };

                $scope.add = function() {

                    
                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/v2/items/editor.html',
                        controller: 'ItemEditor',
                        animation: false,
                        resolve: {
                            item: function() {
                                return {
                                    name: null, description: null, keywords: null, source: null,
                                    usage: null, slot: null, weight: 0, darkstone: 0, slots: 0, cost: 0, hands: 0
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function(item) {
                        if(!item || !item.name) return;
                        
                        if(!$scope.character.items)
                            $scope.character.items = {};

                        var obj = {};
                        obj[item.name] = item;
                        angular.merge($scope.character.items, obj);

                        $scope.onSave();
                        update();   //recalc weights
                        
                    }, function () { });

                };

            }
        };
    }])


    .directive('item', ['$window', '$uibModal', function($window, $uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.name = $scope.name;
            this.item = $scope.item;

            //
            $window.SOBCharItemsUsage = $window.SOBCharItemsUsage || {};
            $window.SOBCharItemsUsage[this.name] = $window.SOBCharItemsUsage[this.name] || false;

            this.used = $window.SOBCharItemsUsage[this.name];
            
            this.toggleUsed = function() {
                $window.SOBCharItemsUsage[this.name] = this.used;
            };
            //--------------------------------

            this.edit = function() {
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/v2/items/editor.html',
                    controller: 'ItemEditor',
                    animation: false,
                    resolve: {
                        item: function() { 
                            var copy = angular.copy($scope.item);
                            copy.name = $scope.name;
                            return copy; 
                        }
                    }
                });

                modalInstance.result.then(function(item) {
                    if(!item || !item.name) return; //cancel
                    
                    angular.forEach(item, function(value, key) {
                        $scope.ctrl.item[key] = value;
                    });
                    // console.log($scope.ctrl.item);
                    $scope.ctrl.save();
                                        
                }, function () { });

            };

            this.save = function() {
                $scope.onSave({ item: this.item });
            };

            this.remove = function() {
                $scope.onSave({ item: null });
            };

        }

        return {
            scope: {
                name: "@",
                item: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/items/item.html',
            
            controller: Controller
        };
    }]);


}) (angular);