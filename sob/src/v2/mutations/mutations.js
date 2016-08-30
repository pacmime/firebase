(function(angular) {
    
    "use strict";

    angular.module("sob-character").directive('mutations', function() {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/mutations/mutations-and-injuries.html',
            
            controller: function($scope, $element) {

                function init() {
                    $scope.value = {name: null, desc: null};
                }
                init();
                
                $scope.add = function() {
                    if(!$scope.value.name) return;
                    $scope.character.mutations = $scope.character.mutations || {}
                    $scope.character.mutations[$scope.value.name] = $scope.value.desc;
                    $scope.onSave();
                    init();
                };

                $scope.onEdited = function(name, newName, newDesc) {

                    if(name !== newName) {
                        //delete old property
                        delete $scope.character.mutations[name];
                    }

                    if(newName && newDesc) 
                        $scope.character.mutations[newName] = newDesc;

                    $scope.onSave();
                };


            }
        };
    })


    .directive('mutation', function() {

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
                name: "@",
                desc: "@",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/mutations/mutation.html',
            
            controller: Controller
        };
    });


}) (angular);