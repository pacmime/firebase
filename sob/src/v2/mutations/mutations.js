(function(angular) {
    
    "use strict";

    angular.module("sob-character")

    .directive('mutations', ['DBHelper', function(DBHelper) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/mutations/mutations-and-injuries.html',
            
            controller: function($scope, $element) {


                $scope.mutations = [];
                $scope.injuries = [];
                $scope.madness = [];

                $scope.mimOpts = [];

                DBHelper('mutations').$loaded(function(mutations) {
                    for(var key in mutations) {
                        if(key.indexOf("$")<0 && typeof(mutations[key]) == 'object') {
                            $scope.mimOpts.push({
                                name: mutations[key].name, 
                                desc: mutations[key].desc, 
                                group: "Mutations"
                            });
                            $scope.mutations.push(mutations[key].name);
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
                                $scope.injuries.push(injuries[key].name);
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
                                    $scope.madness.push(madness[key].name);
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
                    if(!$scope.customMutation.name) return;
                    $scope.character.mutations = $scope.character.mutations || {};
                    if($scope.character.mutations[$scope.customMutation.name]) {
                        alert("Character already has a mutation, injury, or madness with that name");
                        return;
                    }
                    $scope.character.mutations[$scope.customMutation.name] = $scope.customMutation.desc;
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

                $scope.getType = function(name) {
                    if(~$scope.mutations.indexOf(name)) return 'mutation';
                    if(~$scope.injuries.indexOf(name)) return 'injury';
                    if(~$scope.madness.indexOf(name)) return 'madness';
                    return '';
                };

            }
        };
    }])


    .component('mutation', {

        bindings: {
            name: "@",
            desc: "@",
            type: '@',
            onSave: '&'
        },
        
        templateUrl: 'src/v2/mutations/mutation.html',
        
        controller: function () {

            //remember original name just in case it changes
            this.originalName = this.name;

            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                this.onSave({
                    newName: this.name, 
                    newDesc: this.desc
                });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
            };

            this.remove = function() {
                this.onSave({newName: null, newDesc: null});
            };

        }

    });


}) (angular);