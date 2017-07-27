(function(angular) {
    
    "use strict";

    angular.module("sob-character")

    .component('mutations', {

        bindings: {
            character: "=",
            onSave: '&',
            onChange: "&"
        },

        templateUrl: 'src/v2/mutations/mutations-and-injuries.html',
        
        controller: function($rootScope, DBHelper) {

            this.$onInit = function() {
            
                this.newMutation = null;
                
                this.mutations = [];
                this.injuries = [];
                this.madness = [];

                this.mimOpts = [];


                DBHelper('mutations').$loaded( (mutations) => {
                    for(var key in mutations) {
                        if(key.indexOf("$")<0 && typeof(mutations[key]) == 'object') {

                            let mut = JSON.parse(JSON.stringify(mutations[key]));
                            mut.group = "Mutations";
                            this.mimOpts.push(mut);
                            this.mutations.push(mut.name);
                        }
                    }
                    DBHelper('injuries').$loaded( (injuries) => {
                        for(var key in injuries) {
                            if(key.indexOf("$")<0 && typeof(injuries[key]) == 'object') {

                                let inj = JSON.parse(JSON.stringify(injuries[key]));
                                inj.group = "Injuries";
                                this.mimOpts.push(inj);
                                this.injuries.push(inj.name);
                            }
                        }
                        DBHelper('madness').$loaded( (madness) => {
                            for(var key in madness) {
                                if(key.indexOf("$")<0 && typeof(madness[key]) == 'object') {
                                    
                                    let mad = JSON.parse(JSON.stringify(madness[key]));
                                    mad.group = "Madness";
                                    this.mimOpts.push(mad);
                                    this.madness.push(mad.name);
                                }
                            }

                            this.refreshOptions();
                        });
                    });
                });
                
                this.init();
            };

            
            this.init = function() {
                this.newMutation = null;
                this.refreshOptions();
            };
            
            
            this.refreshOptions = function () {
               
                this.character.$loaded( () => {
                
                    if(this.character.mutations) {
                        
                        //update mutations if needed
                        let updated = false;
                        angular.forEach(this.character.mutations, (mutation, id) => {

                            if(typeof(mutation) === 'string') { //older mutation format:  name: desc
                                
                                let found = this.mimOpts.find( mut => mut.name === id);
                                if(found) {
                                    this.character.mutations[id] = JSON.parse(JSON.stringify(found));
                                    updated = true;
                                } else {
                                    this.character.mutations[id] = null; //drop it
                                }
                            }
                        });
                        if(updated) {
                            this.onSave();
                        }

                        //disable option if character already has this mutation, injury, or madness
                        angular.forEach(this.mimOpts, (opt) => {
                            opt.disabled = this.hasMutInjMad(opt.name); //this.character.mutations[opt.name];
                        });

                    }
                });
            };

            /**
             *
             */
            this.hasMutInjMad = function(arg) {
                let name = (typeof(arg) === 'object') ? arg.name : arg;
                for(var id in this.character.mutations) {
                    if(this.character.mutations[id].name == name) 
                        return true;
                }
                return false;
            };
            
            /**
             *
             */
            this.add = function() {
                if(!this.newMutation.name) return;
                this.character.mutations = this.character.mutations || {};

                let hasMods = this.newMutation.modifiers;
                let mut = JSON.parse(JSON.stringify(this.newMutation));
                this.character.mutations[UUID()] = mut;

                // this.character.mutations[this.newMutation.name] = this.newMutation.desc;
                this.onSave();
                this.init();
                
                //if the ability added has modifiers, notify listeners
                if(hasMods) {
                    this.onChange();
                }
            };

            
            /**
             * @param {string} id
             * @param {object} updated
             */
            this.onEdited = function(id, updated) {

                if(!updated) {  //remove mutation/inj/madness
                    
                    let hasMods = this.character.mutations[id].modifiers;
                    
                    delete this.character.mutations[id];

                    //if the ability added has modifiers, notify listeners
                    if(hasMods) {
                        this.onChange();
                    }
                }

                if(updated) {
                    this.character.mutations[id].name = updated.name;
                    this.character.mutations[id].desc = updated.desc;
                }

                this.onSave();
                this.init();
            };

            /**
             * @param {string} name
             */
            this.getType = function(name) {
                if(~this.mutations.indexOf(name)) return 'mutation';
                if(~this.injuries.indexOf(name)) return 'injury';
                if(~this.madness.indexOf(name)) return 'madness';
                return '';
            };
        }
    })


    .component('mutation', {

        bindings: {
            mutation: "<",
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