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

                            let mut = JSON.parse(JSON.stringify(mutations[key]));
                            mut.group = "Mutations";
                            $scope.mimOpts.push(mut);
                            $scope.mutations.push(mut.name);
                        }
                    }
                    DBHelper('injuries').$loaded(function(injuries) {
                        for(var key in injuries) {
                            if(key.indexOf("$")<0 && typeof(injuries[key]) == 'object') {

                                let inj = JSON.parse(JSON.stringify(injuries[key]));
                                inj.group = "Injuries";
                                $scope.mimOpts.push(inj);
                                $scope.injuries.push(inj.name);
                            }
                        }
                        DBHelper('madness').$loaded(function(madness) {
                            for(var key in madness) {
                                if(key.indexOf("$")<0 && typeof(madness[key]) == 'object') {
                                    
                                    let mad = JSON.parse(JSON.stringify(madness[key]));
                                    mad.group = "Madness";
                                    $scope.mimOpts.push(mad);
                                    $scope.madness.push(mad.name);
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
                        
                        //update mutations if needed
                        let updated = false;
                        angular.forEach($scope.character.mutations, (mutation, id) => {
                            if(typeof(mutation) === 'string') {
                                //older mutation format:  name: desc

                                let found = $scope.mimOpts.find( mut => mut.name === id);
                                if(found) {
                                    $scope.character.mutations[id] = JSON.parse(JSON.stringify(found));
                                    updated = true;
                                } else {
                                    $scope.character.mutations[id] = null; //drop it
                                }
                            }
                        });
                        if(updated) {
                            $scope.onSave();
                        }

                        //disable option if character already has this mutation, injury, or madness
                        angular.forEach($scope.mimOpts, function(opt) {
                            opt.disabled = $scope.hasMutInjMad(opt.name); //$scope.character.mutations[opt.name];
                        });

                    }
                }

                $scope.hasMutInjMad = function(arg) {
                    let name = (typeof(arg) === 'object') ? arg.name : arg;
                    for(var id in $scope.character.mutations) {
                        if($scope.character.mutations[id].name == name) 
                            return true;
                    }
                    return false;
                };
                
                $scope.add = function() {
                    if(!$scope.newMutation.name) return;
                    $scope.character.mutations = $scope.character.mutations || {};

                    let hasMods = $scope.newMutation.modifiers;
                    let mut = JSON.parse(JSON.stringify($scope.newMutation));
                    $scope.character.mutations[UUID()] = mut;

                    // $scope.character.mutations[$scope.newMutation.name] = $scope.newMutation.desc;
                    $scope.onSave();
                    init();
                    refreshOptions();

                    //if the ability added has modifiers, notify listeners
                    if(hasMods) {
                        $scope.$emit('modifiers:changed', true);
                    }
                };

                $scope.addCustom = function() {
                    if(!$scope.customMutation.name) return;
                    $scope.character.mutations = $scope.character.mutations || {};

                    let mut = JSON.parse(JSON.stringify($scope.customMutation));
                    $scope.character.mutations[UUID()] = mut;

                    // if($scope.character.mutations[$scope.customMutation.name]) {
                    //     alert("Character already has a mutation, injury, or madness with that name");
                    //     return;
                    // }
                    // $scope.character.mutations[$scope.customMutation.name] = $scope.customMutation.desc;
                    $scope.onSave();
                    init();
                    refreshOptions();
                };

                // $scope.onEdited = function(name, newName, newDesc) {

                //     if(name !== newName) {
                //         //delete old property
                //         delete $scope.character.mutations[name];
                //     }

                //     if(newName && newDesc) 
                //         $scope.character.mutations[newName] = newDesc;

                //     $scope.onSave();
                // };

                $scope.onEdited = function(id, updated) {

                    if(!updated) {  //remove mutation/inj/madness
                        
                        let hasMods = $scope.character.mutations[id].modifiers;
                        
                        delete $scope.character.mutations[id];

                        //if the ability added has modifiers, notify listeners
                        if(hasMods) {
                            $scope.$emit('modifiers:changed', true);
                        }
                    }

                    if(updated) {
                        $scope.character.mutations[id].name = updated.name;
                        $scope.character.mutations[id].desc = updated.desc;
                    }

                    $scope.onSave();
                    init();
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
            mutation: "=",
            onSave: '&'
        },
        
        templateUrl: 'src/v2/mutations/mutation.html',
        
        controller: function () {

            this.$onInit = function() {
            
                //remember original name just in case it changes
                this.originalName = this.mutation.name;
                this.name = this.mutation.name;
                this.desc = this.mutation.desc;
            };

            this.edit = function() {
                this.displayEditor = true;
            };

            // this.save = function() {
            //     this.onSave({
            //         newName: this.name, 
            //         newDesc: this.desc
            //     });
            //     this.displayEditor = false;
            // };

            this.save = function() {
                $scope.onSave({ 
                    updated: {name: this.name, desc: this.desc} 
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