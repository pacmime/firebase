(function(angular) {
    
    "use strict";

    angular.module("sob-character").directive('abilities', function() {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/abilities/abilities.html',
            
            controller: function($scope, $element) {

                function init() {
                    $scope.value = {name: null, desc: null};
                }
                init();
                
                $scope.add = function() {
                    if(!$scope.value.name) return;
                    $scope.character.abilities = $scope.character.abilities || {}
                    $scope.character.abilities[$scope.value.name] = $scope.value.desc;
                    $scope.onSave();
                    init();
                };

                $scope.onEdited = function(name, newName, newDesc) {

                    if(name !== newName) {
                        //delete old property
                        delete $scope.character.abilities[name];
                    }

                    if(newName && newDesc) 
                        $scope.character.abilities[newName] = newDesc;

                    $scope.onSave();
                };


            }
        };
    })


    .directive('ability', function() {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            //remember original name just in case it changes
            var originalName = $scope.name;
            this.name = $scope.name;
            this.desc = $scope.desc;
            
            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                $scope.onSave({
                    newName: this.name, 
                    newDesc: this.desc
                });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
            };

            this.remove = function() {
                $scope.onSave({newName: null, newDesc: null});
            };

        }

        return {
            scope: {
                // character: "=",
                name: "@",
                desc: "@",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/abilities/ability.html',
            
            controller: Controller
        };
    });


}) (angular);