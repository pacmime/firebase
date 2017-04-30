(function(angular) {
    
    "use strict";

    angular.module("sob-character").directive('mutations', ['DBHelper', function(DBHelper) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/mutations/mutations-and-injuries.html',
            
            controller: function($scope, $element) {

                $scope.mimOpts = [];

                DBHelper('mutations').$loaded(function(mutations) {
                    for(var key in mutations) {
                        if(key.indexOf("$")<0 && typeof(mutations[key]) == 'object') {
                            $scope.mimOpts.push({
                                name: mutations[key].name, 
                                desc: mutations[key].desc, 
                                group: "Mutations"
                            });
                        }
                    }
                    DBHelper('injuries').$loaded(function(injuries) {
                        for(var key in injuries) {
                            if(key.indexOf("$")<0 && typeof(injuries[key]) == 'object') {
                                $scope.mimOpts.push({
                                    name: injuries[key].name, 
                                    desc: injuries[key].desc, 
                                    group: "Injuries"
                                });
                            }
                        }
                        DBHelper('madness').$loaded(function(madness) {
                            for(var key in madness) {
                                if(key.indexOf("$")<0 && typeof(madness[key]) == 'object') {
                                    $scope.mimOpts.push({
                                        name: madness[key].name, 
                                        desc: madness[key].desc, 
                                        group: "Madness"
                                    });
                                }
                            }

                            refreshOptions();
                        });
                    });
                });

                $scope.newMutation = null;
                function init() {
                    $scope.newMutation = null;
                    $scope.customMutation = {name: null, desc: null};
                }
                init();

                function refreshOptions() {
                    if($scope.character.mutations) {
                        //disable option if character already has this mutation, injury, or madness
                        angular.forEach($scope.mimOpts, function(opt) {
                            opt.disabled = $scope.character.mutations[opt.name];
                        });
                    }
                }
                
                $scope.add = function() {
                    if(!$scope.newMutation.name) return;
                    $scope.character.mutations = $scope.character.mutations || {};
                    $scope.character.mutations[$scope.newMutation.name] = $scope.newMutation.desc;
                    $scope.onSave();
                    init();
                    refreshOptions();
                };

                $scope.addCustom = function() {
                    if(!$scope.value.name) return;
                    $scope.character.mutations = $scope.character.mutations || {};
                    if($scope.character.mutations[$scope.customMutation.name]) {
                        alert("Character already has a mutation, injury, or madness with that name");
                        return;
                    }$scope.character.mutations[$scope.value.name] = $scope.value.desc;
                    $scope.onSave();
                    init();
                    refreshOptions();
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
    }])


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