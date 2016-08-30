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
                        templateUrl: 'src/character/items/editor.html',
                        controller: 'ItemEditor',
                        animation: false,
                        resolve: {
                            item: function() {return null;}
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


    .directive('item', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.name = $scope.name;
            this.item = $scope.item;
            
            this.edit = function() {
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/character/items/editor.html',
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
            templateUrl: 'src/character/items/item.html',
            
            controller: Controller
        };
    }]);


}) (angular);