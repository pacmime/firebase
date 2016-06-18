(function(angular) {
    
    "use strict";

    angular.module("sob-character")

    .directive('clothing2', ['$timeout', '$uibModal', function($timeout, $uibModal) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/clothing/clothing.html',
            
            controller: function($scope, $element) {

                function update() {
                    
                    var weight=0, darkstone=0;
                    angular.forEach($scope.character.clothing, function(item, type) {
                        
                        if(!item.type)
                            item.type = type;

                        weight += item.weight||0;
                        darkstone += item.darkstone||0;
                    
                    });

                    $scope.itemWeight = weight;
                    $scope.itemDarkstone = darkstone;
                }
                
                $scope.character.$loaded().then(update);



                $scope.onEdited = function(item, type) {

                    //if deleting item or renaming it
                    if(!item)
                        delete $scope.character.clothing[type];

                    if(item)
                        $scope.character.clothing[item.type] = item;

                    $scope.onSave();
                    update();
                };

                $scope.add = function() {
                    
                    var types = ['hat','face','shoulders','coat','torso','belt','gloves','boots'];
                    angular.forEach($scope.character.clothing, function(item, type) {
                        var index = types.indexOf(type);
                        if(index >= 0)
                            types.splice(index, 1);
                    });


                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/character/clothing/editor.html',
                        controller: 'ClothingEditor',
                        animation: false,
                        resolve: {
                            item: function() {return null;},
                            types: function() {return types;}
                        }
                    });

                    modalInstance.result.then(function(item) {
                        if(!item || !item.name || !item.type) return;

                        $scope.character.clothing = $scope.character.clothing || {};
                        if($scope.character.clothing[item.type]) return;    //already has one
                        
                        var obj = {};
                        obj[item.type] = item;
                        angular.merge($scope.character.clothing, obj);

                        $scope.onSave();
                        update();   //recalc weights
                        
                    }, function () { });

                };

            }
        };
    }])


    .directive('clothingItem2', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.clothing = $scope.clothingItem;
            
            this.edit = function() {
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/character/clothing/editor.html',
                    controller: 'ItemEditor',
                    animation: false,
                    resolve: {
                        item: function() { 
                            var copy = angular.copy($scope.clothingItem);
                            return copy; 
                        }, 
                        types: function() {return [$scope.clothingItem.type];}
                    }
                });

                modalInstance.result.then(function(item) {
                    if(!item || !item.name) return; //cancel
                    
                    angular.forEach(item, function(value, key) {
                        $scope.ctrl.clothing[key] = value;
                    });
                    // console.log($scope.ctrl.clothing);
                    $scope.ctrl.save();
                                        
                }, function () { });

            };

            this.save = function() {
                console.log("Saving...");
                $scope.onSave({ item: this.clothing, type: this.clothing.type });
            };

            this.remove = function() {
                $scope.onSave({ item: null, type: this.clothing.type });
            };

        }

        return {
            scope: {
                clothingItem: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/clothing/clothing-item.html',
            
            controller: Controller
        };
    }]);


}) (angular);