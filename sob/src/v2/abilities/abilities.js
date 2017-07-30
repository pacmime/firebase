(function(angular) {
    
    "use strict";


    angular.module("sob-character")


    .component('abilities', {

        bindings: {
            character: "=",
            onSave: '&',
            onChange: '&'
        },

        templateUrl: 'src/v2/abilities/abilities.html',

        controller: function(CharacterOptions) {

            /**
             *
             */
            this.$onInit = function() {
                this.charOptions = CharacterOptions('abilities', this.character.class);
                this.charOptions.$loaded().then(() => this.init() );
            };

            /**
             * @return {boolean}
             */
            this.hasAbility = function(name) {
                for(var id in this.character.abilities) {
                    if(this.character.abilities[id].name === name &&
                        !this.character.abilities[id].custom) return true;
                }
                return false;
            };

            /**
             *
             */
            this.init = function() {

                this.newAbility = null;
                
                this.options = [];

                this.options.push({
                    name: 'Custom Ability',
                    desc: 'This is a custom ability. Click the pencil icon to edit it',
                    custom: true
                });

                angular.forEach(this.charOptions, (value, name) => {
                    
                    if(typeof(value) === 'string') {
                        this.options.push({
                            name : name, 
                            desc: value, 
                            disabled: this.hasAbility(name)
                        });

                    } else {
                        
                        //if it requires a skill one doesn't have or can't be added multiple times...
                        var disabled = !value.multi && this.hasAbility(name);
                        if(!disabled && value.requires && !this.hasAbility(value.requires)) {
                            name = name + " (requires " + value.requires + ")";
                            disabled = true;
                        }
                        this.options.push({name : name, desc: value.value, disabled: disabled});
                    }
                });
            };
            
            /**
             *
             */
            this.add = function() {

                if(!this.newAbility) return;

                let ability = this.getFullAbility(this.newAbility.name);
                if(!ability) 
                    ability = this.newAbility;

                let hasMods = ability.modifiers;
                
                this.character.abilities = this.character.abilities || {};
                this.character.abilities[UUID()] = JSON.parse(JSON.stringify(ability));
                this.onSave();
                this.init();

                //if the ability added has modifiers, notify listeners
                if(hasMods) this.onChange();

            };

            
            /**
             *
             */
            this.onEdited = function(id, updated) {

                if(!updated) {  //remove ability

                    let hasMods = this.character.abilities[id].modifiers;
                    delete this.character.abilities[id];

                    //if the ability added has modifiers, notify listeners
                    if(hasMods) {
                        this.onChange();
                    }
                }

                if(updated) {
                    this.character.abilities[id].name = updated.name;
                    this.character.abilities[id].desc = updated.desc;
                }

                this.onSave();
            };

            this.getFullAbility = function(name) {
                let ability = this.charOptions[name];
                if(ability) {
                    ability = JSON.parse(JSON.stringify(ability));
                    ability.name = name;
                    ability.desc = ability.value;
                    delete ability.value;
                    return ability;
                } 
                return null;
            };

        }
    })


    .component('ability', {

        bindings: {
            ability: "<",
            onSave: '&'
        },
        
        templateUrl: 'src/v2/abilities/ability.html',
        
        controller: function() {

            this.$onInit = function() {
                //remember original name just in case it changes
                // var originalName = $scope.name;
                this.name = this.ability.name;
                this.desc = this.ability.desc;
            };

            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                this.onSave({ updated: {name: this.name, desc: this.desc} });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
            };

            this.remove = function() {
                this.onSave({updated: null});
            };

        }

    });


}) (angular);