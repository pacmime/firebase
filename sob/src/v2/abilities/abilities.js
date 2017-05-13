(function(angular) {
    
    "use strict";


    angular.module("sob-character").directive('abilities', ['CharacterOptions', function(CharacterOptions) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/abilities/abilities.html',
            
            controller: function($scope, $element) {

                var charOptions = CharacterOptions('abilities', $scope.character.class);
                charOptions.$loaded().then(init);

                function hasAbility(name) {
                    for(var id in $scope.character.abilities) {
                        if($scope.character.abilities[id].name == name) return true;
                    }
                    return false;
                }

                function init() {

                    $scope.newAbility = null;
                    $scope.customAbility = {name: null, desc: null};    

                    $scope.options = [];
                    angular.forEach(charOptions, function(value, name) {
                        
                        if(typeof(value) === 'string') {
                            $scope.options.push({name : name, desc: value, disabled: hasAbility(name)});

                        } else {
                            //if it requires a skill one doesn't have or can't be added multiple times...
                            var disabled = !value.multi && hasAbility(name);
                            if(!disabled && value.requires && !hasAbility(value.requires)) {
                                name = name + " (requires " + value.requires + ")";
                                disabled = true;
                            }
                            $scope.options.push({name : name, desc: value.value, disabled: disabled});
                        }
                    });
                }
                // init();
                
                $scope.add = function() {
                    if(!$scope.newAbility) return;
                    $scope.character.abilities = $scope.character.abilities || {};
                    $scope.character.abilities[UUID()] = JSON.parse(JSON.stringify($scope.newAbility));
                    let hasMods = $scope.newAbility.modifiers;
                    $scope.onSave();
                    init();

                    //if the ability added has modifiers, notify listeners
                    if(hasMods) {
                        $scope.$emit('modifiers:changed', true);
                    }
                };

                $scope.addCustom = function() {
                    if(!$scope.customAbility.name) return;
                    $scope.character.abilities = $scope.character.abilities || {};
                    $scope.character.abilities[UUID()] = $scope.customAbility;
                    $scope.onSave();
                    init();
                };

                $scope.onEdited = function(id, updated) {

                    if(!updated) {  //remove ability

                        let hasMods = $scope.character.abilities[id].modifiers;
                        delete $scope.character.abilities[id];

                        //if the ability added has modifiers, notify listeners
                        if(hasMods) {
                            $scope.$emit('modifiers:changed', true);
                        }
                    }

                    if(updated) {
                        $scope.character.abilities[id].name = updated.name;
                        $scope.character.abilities[id].desc = updated.desc;
                    }

                    $scope.onSave();
                };


            }
        };
    }])


    .directive('ability', function() {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            //remember original name just in case it changes
            // var originalName = $scope.name;
            this.name = $scope.ability.name;
            this.desc = $scope.ability.desc;
            
            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                $scope.onSave({ updated: {name: this.name, desc: this.desc} });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
            };

            this.remove = function() {
                $scope.onSave({updated: null});
            };

        }

        return {
            scope: {
                ability: "=",
                // character: "=",
                // name: "@",
                // desc: "@",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/v2/abilities/ability.html',
            
            controller: Controller
        };
    });


}) (angular);