(function(angular) {
    "use strict";

    angular.module('sob-common', [])

    .constant('DataStoreUrl', "https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone")

    .factory("DataStore", ["$firebaseObject",
        function($firebaseObject) {
            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone/chars");
            return $firebaseObject(ref);
        }
    ])

    .factory("CharacterRef", ["$firebaseObject",
        function($firebaseObject) {
            return function(name) {
                var ref = new Firebase("https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone/chars/" + name);
                return $firebaseObject(ref);
            }
        }
    ])


    .filter('encode', function() {
        return function(value) {
            return encodeURIComponent(value);
        };
    })

    .filter('decode', function() {
        return function(value) {
            return decodeURIComponent(value);
        };
    })

    .controller('ItemEditor', function($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })


    .controller('KeyPad', function ($scope, $uibModalInstance, value) {

        $scope.value = value;
        
        $scope.change = function(v) { $scope.value += v; }
        
        $scope.ok = function () {
            $uibModalInstance.close($scope.value);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })


    .directive('editableStatValue', ['$uibModal', function($uibModal) {
        return {
            scope: {
                onSave: '&'
            },
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            template: '<div class="value" ng-click="openKeypad()">{{display}}</div>',
            link: function($scope, $element, $attrs, ngModelController) {

                ngModelController.$render = function() {
                    $scope.display = ngModelController.$viewValue;
                };


                $scope.openKeypad = function() {

                    var value = ngModelController.$modelValue || 0;

                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/keypad.html',
                        controller: 'KeyPad',
                        animation: false,
                        resolve: {
                            value: function() { return value; }
                        }
                    });

                    modalInstance.result.then(function(value) {
                        
                        ngModelController.$setViewValue(value);
                        ngModelController.$render();
                        if($scope.onSave)
                            $scope.onSave();

                    }, function () { });

                };
            }
        };
    }])



    .directive('editableInput', ['$timeout', function($timeout) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                onSave: "&"
            },
            replace: true,
            template: [
                '<div class="editable-input">',
                '  <label class="editable-input-label">{{::label}}</label>',
                '  <span class="editable-input-display" ng-show="!editing" ng-click="edit()"></span>',

                '    <form class="form" ng-show="editing">',
                '      <div class="form-group">',
                '        <div class="grid">', 
                '          <div class="grid__col-auto grid__col--grow-2">',   
                '            <input type="text" class="form-control editable-input-field" ',
                '              ng-keyup="onKeyUp($event, $event.keyCode)"></input>',
                '          </div>',
                '          <div class="grid__col-auto">',
                '            <div class="editable-input-buttons">',
                '              <button type="button" class="btn btn-xs btn-link text-success" ng-disabled="error" ng-click="done()" tabindex="0">',
                '                <span class="glyphicon glyphicon-ok"></span>',
                '              </button>',
                '              <button type="button" class="btn btn-xs btn-link text-danger" ng-click="cancel()"  tabindex="0">',
                '                <span class="glyphicon glyphicon-remove"></span>',
                '              </button>',
                '            </div>',
                '          </div>',
                '        </div>',
                '      </div>',
                '    </form>',
                '</div>'
            ].join(' '),

            link: function($scope, $element, $attrs, ngModelController) {

                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }

                // when model change, update our view (just update the div content)
                ngModelController.$render = function() {

                    var value = ngModelController.$viewValue;
                    var display = (!value || !value.length || !value.trim().length) ? "Please enter a value" : value;
                    $element.find('.editable-input-display').text(display);
                    $element.find('.editable-input-field').val(value);
                };


                /* ------------- private methods --------------- */

                $scope.edit = function() {
                    $scope.editing=true;
                    $timeout(function() {
                        $element.find('.editable-input-field').focus().select();
                    }, 200);
                };
                $scope.done = function() {
                    //update display with new value
                    var value = $element.find('.editable-input-field').val();
                    update(value);
                    $scope.editing=false;
                    $scope.onSave();
                };
                $scope.cancel = function() {
                    //reset input
                    $element.find('.editable-input-field').val(ngModelController.$viewValue);
                    $scope.editing=false;
                };
                
                $scope.onKeyUp = function($event, code) {
                    // console.log("Up " + code);
                    if((code === undefined || code === 0) && $event.which !== undefined)
                        code = $event.which;
                    if(code === 13 && !$scope.error) $scope.done();  //enter
                    else if(code === 27)             $scope.cancel();//esc
                    
                };

            }
        };

    }])


    ;

}) (angular);
;
(function(angular) {
    
    "use strict";

    var app = angular.module("sob-character", ['ngSanitize', 'ui.bootstrap', "firebase", 'sob-common']);

    
    app.controller("CharacterController", [
        "$scope", "$routeParams", "$uibModal", "CharacterRef",
        function($scope, $routeParams, $uibModal, CharacterRef) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };

        //load the campaign
        this.charName = decodeURIComponent($routeParams.charId);
        this.character = CharacterRef(this.charName);
        this.character.$loaded().then(function() {
            
            var weight=0, darkstone=0;
            angular.forEach(self.character.items, function(item) {
                weight += item.weight||0;
                darkstone += item.darkstone||0;
            });
            self.itemWeight = weight;
            self.itemDarkstone = darkstone;

        }).catch(function(error) {
            self.displayOpts.loading = false;
            self.displayOpts.error = error.data;
        });



        this.onInputKeyPress = function($event) {
            var key = $event.keyCode || $event.which;
            if(key === 13) {    //enter
                // this.save();
            }
        };


        this.save = function() {
            console.log("Saved");
            // this.character.$save();
        };

        this.addNewAbility = function() {
            this.character.abilities[this.newAbility.name] = this.newAbility.desc;
            this.save();
            this.newAbility = null;
        };

        this.addNewItem = function() {

            var modalInstance = $uibModal.open({
                templateUrl: 'src/item.html',
                controller: 'ItemEditor',
                animation: false
            });

            modalInstance.result.then(function(item) {
                if(!item || !item.name) return;
                
                self.character.items[item.name] = {
                    source: item.source,
                    description: item.description,
                    weight: item.weight,
                    darkstone: item.darkstone,
                    hands: item.hands,
                    slots: item.slots
                };
                // this.save();
                
            }, function () { });

        }

        // this.toggleEditor = function(name) {
        //     this.displayOpts.editors = this.displayOpts.editors || {};
        //     var open = this.displayOpts.editors[name] = !this.displayOpts.editors[name];
        //     if(!open)
        //         this.save();
        // };


    }]);


}) (angular);
;
(function(angular) {
    
    "use strict";

    var app = angular.module("sob-home", ["firebase", "sob-common"]);

    
    
    app.controller("HomeController", [
        "$scope", "$timeout", "DataStore",
        function($scope, $timeout, DataStore) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };


        //load saved campaigns
        // this.data = DataStore;
        DataStore.$loaded().then(function() {
            updateList();
            self.displayOpts.loading = false;
        }).catch(function(error) {
            self.displayOpts.error = "Failed to load saved data: " + error.data;
        });
        

        function updateList() {
            var chars = [];
            angular.forEach(DataStore, function(value, key) { 
                chars.push(key); 
            });
            self.chars = chars;
        }

        this.createCharacter = function() {
            var name = prompt("Name the character", "Joe Bob");
            if(!name) {
                alert("Characters must have a name");
                return;
            }
            var json = getCharacterShell();
            DataStore[name] = json;
            DataStore.$save().then(function() {
                //navigate to the new char page
                window.location = '#/' + encodeURIComponent(name);

            }).catch(function(error) {
                alert("Unable to create character because of an error");
            });

        };

    }]);


    function getCharacterShell() {
        return {
            "abilities" : {},
            "class" : " ",
            "clothing" : {
                "Hat" : {},
                "Face" : {},
                "Shoulders" : {},
                "Coat" : {},
                "Torso": {},
                "Gloves": {},
                "Belt": {},
                "Pants": {},
                "Boots": {}
            },
            "combat" : 1,
            "corruption" : {
              "current" : 0,
              "max" : 5
            },
            "darkstone" : 0,
            "defense" : 5,
            "faith" : 0,
            "grit" : {
              "current" : 1,
              "max" : 2
            },
            "health" : {
              "max" : 10,
              "wounds" : 0
            },
            "init" : 2,
            "items" : { },
            "keywords" : " ",
            "level" : 1,
            "melee" : 5,
            "movement" : 0,
            "ranged" : 5,
            "sanity" : {
              "loss" : 0,
              "max" : 10
            },
            "sidebag" : {
              "capacity" : 5,
              "whiskey" : 0,
              "fungus": 0,
              "tonic": 0,
              "bandages": 0,
              "herbs": 0,
              "dynamite": 0,
              "flash": 0
            },
            "stats" : {
              "Agility" : 1,
              "Cunning" : 1,
              "Lore" : 1,
              "Luck" : 1,
              "Spirit" : 1,
              "Strength" : 1
            },
            "wealth" : 0,
            "willpower" : 5,
            "xp" : 0
        };
    }


}) (angular);
;
(function(angular) {

    "use strict";

    angular.module("app", ['ngRoute', 'sob-home', 'sob-character'])

    .config(function myAppConfig ($routeProvider, $locationProvider) {
        
        //default route if invalid one is supplied
        $routeProvider
        
        .when('/:charId', {
            templateUrl: 'src/character/character.html',
            controller: 'CharacterController as ctrl'
        })
        
        .when('/', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeController as ctrl'
        })

        // .otherwise({ redirectTo: "/" });
      
        //http://stackoverflow.com/questions/17895675/angularjs-html5mode-refresh-page-get-404
        // $locationProvider.html5Mode(true);

        if(!(window.history && history.pushState))
            console.log("Your browser does not support HTML5 mode");
    })

    
})(angular);

;
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('character/char-bs.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-5 col-md-6 col-lg-8\">\n" +
    "\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "\n" +
    "                    <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                    <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                    <div>\n" +
    "                        <div><label>To Hit:</label></div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-7 col-md-6 col-lg-4\">\n" +
    "\n" +
    "                    <div class=\"stats\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Agility</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Cunning</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Strength</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Lore</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Initiative</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"body\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "                    <div class=\"items\">\n" +
    "                        <h4>Items</h4>\n" +
    "\n" +
    "                        <div ng-repeat=\"(name, item) in ctrl.character.items\" class=\"item row row--no-gutter\">\n" +
    "                            <div class=\"col-sm-9 col-sm-push-3 col-md-8 col-md-push-4\">\n" +
    "                                <strong>{{name}}: </strong> {{item.description}} [<em>{{item.source}}</em>]\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3 col-sm-pull-9 col-md-4 col-md-pull-8\">\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_weight.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.weight}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_darkstone.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.darkstone}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_hands.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.hands}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_slots.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.slots}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"ctrl.addNewItem()\">New</button>\n" +
    "                                        \n" +
    "                        <img src=\"assets/item_weight.png\" width=\"32\"> {{ctrl.itemWeight}}\n" +
    "                        <img src=\"assets/item_darkstone.png\" width=\"32\"> {{ctrl.itemDarkstone}}\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "                    <div class=\"abilities\">\n" +
    "                        <h4>Abilities</h4>\n" +
    "                        <div ng-repeat=\"(name, desc) in ctrl.character.abilities\">\n" +
    "                            <strong>{{name}}</strong> <small>{{desc}}</small>\n" +
    "                            <br><br>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "                                    ng-model=\"ctrl.newAbility.name\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" \n" +
    "                                    ng-model=\"ctrl.newAbility.desc\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-2\">\n" +
    "                                <button type=\"button\" class=\"btn btn-success\" \n" +
    "                                    ng-disabled=\"!ctrl.newAbility.name\" \n" +
    "                                    ng-click=\"ctrl.addNewAbility()\">+</button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"footer\">\n" +
    "\n" +
    "        <div class=\"container-fluid\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"level\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Level</label>\n" +
    "                                <div class=\"value\">{{ctrl.character.level}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>XP</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                            <img src=\"assets/xp.png\">\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>Gold</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                            <img src=\"assets/wealth.png\">\n" +
    "                        </div>\n" +
    "                        <div class=\"darkstone\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Dark Stone</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                                <img src=\"assets/darkstone.png\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <br>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"row row--no-gutter\">\n" +
    "\n" +
    "                            <div class=\"col-sm-8 col-sm-push-4\">\n" +
    "                                <div class=\"clearfix\">\n" +
    "                                    <div class=\"health\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Health</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.health.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <img src=\"assets/wealth.png\">\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "                                            <img src=\"assets/wound.png\">    \n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Defense</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"sanity\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Sanity</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <!-- <label>Loss</label> -->\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "                                            <img src=\"assets/sanity.png\">\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Willpower</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    \n" +
    "                                    <div class=\"clearfix\">\n" +
    "                                        <div class=\"faith\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Faith</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.faith\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"corruption\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Corruption</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <!-- <label>Current</label> -->\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                    ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "                                                <img src=\"assets/corruption.png\">\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div>\n" +
    "                                        <div class=\"movement\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Move</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.movement\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"grit\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Grit</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Current</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.current\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                \n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-sm-pull-8\">\n" +
    "                                <div class=\"sidebag\">\n" +
    "                                    <h4>Side Bag</h4>\n" +
    "\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Bandages</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.bandages\"></div>\n" +
    "                                        <img src=\"assets/bandages.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Whiskey</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.whiskey\"></div>\n" +
    "                                        <img src=\"assets/whiskey.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Tonic</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.tonic\"></div>\n" +
    "                                        <img src=\"assets/tonic.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Herbs</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.herbs\"></div>\n" +
    "                                        <img src=\"assets/herb.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Dynamite</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.dynamite\"></div>\n" +
    "                                        <img src=\"assets/dynamite.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Flash</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.flash\"></div>\n" +
    "                                        <img src=\"assets/flash.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Swamp Fungus</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.fungus\"></div>\n" +
    "                                        <img src=\"assets/fungus.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Capacity</label>\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sidebag.capacity\"></div>\n" +
    "                                    </div>    \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "\n" +
    "                    <div class=\"clothing\">\n" +
    "                        <h4>Clothing</h4>\n" +
    "                        <div ng-repeat=\"(slotName,slot) in ctrl.character.clothing\" class=\"media\">\n" +
    "                            <div class=\"media-left\">\n" +
    "                                <strong>{{slotName}}: </strong>\n" +
    "                            </div>\n" +
    "                            <div class=\"media-body\">\n" +
    "                                <div ng-repeat=\"(name,desc) in slot\">\n" +
    "                                    {{name}} <small>{{desc}}</small>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"mutations\">\n" +
    "                        <h4>Mutations</h4>\n" +
    "\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <input type=\"text\" class=\"form-control\">\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                                <button type=\"button\" class=\"btn btn-success\">+</button>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/character.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"grid grid--bleed\">\n" +
    "            \n" +
    "            <div class=\"grid__col-sm-5 grid__col-md-6 grid__col-lg-6\">\n" +
    "\n" +
    "                <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "\n" +
    "                <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                <div class=\"grid\">\n" +
    "                    \n" +
    "                    <div class=\"grid__col-xs-4\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"grid__col-xs-2\">\n" +
    "                        <label style=\"text-align:right\">To Hit:</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"grid__col-xs-3\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"grid__col-xs-3\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"grid__col-sm-7 grid__col-md-6 grid__col-lg-4\">\n" +
    "\n" +
    "                <div class=\"stats\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Agility</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Cunning</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Spirit</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                    </div>\n" +
    "                    <br>\n" +
    "                    <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Strength</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Lore</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Spirit</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Initiative</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"body\">\n" +
    "        <div class=\"grid\">\n" +
    "\n" +
    "            <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "                <div class=\"items\">\n" +
    "                    <h4>Items</h4>\n" +
    "\n" +
    "                    <div ng-repeat=\"(name, item) in ctrl.character.items\" class=\"item grid grid--bleed grid--wrap-reverse\">\n" +
    "    \n" +
    "                        <div class=\"grid__col-sm-3 grid__col-md-4\">\n" +
    "                            <div class=\"grid grid--justify-space-between\">\n" +
    "                                <div class=\"grid__col\">\n" +
    "                                    <img src=\"assets/item_weight.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.weight}}\n" +
    "                                </div>\n" +
    "                                <div class=\"grid__col\">\n" +
    "                                    <img src=\"assets/item_darkstone.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.darkstone}}\n" +
    "                                </div>\n" +
    "                                <div class=\"grid__col\">\n" +
    "                                    <img src=\"assets/item_hands.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.hands}}\n" +
    "                                </div>\n" +
    "                                <div class=\"grid__col\">\n" +
    "                                    <img src=\"assets/item_slots.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.slots}}\n" +
    "                                </div>\n" +
    "                                <div class=\"grid__col\"></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"grid__col-sm-9 grid__col-md-8\">\n" +
    "                            <div>\n" +
    "                                <strong>{{name}} </strong>\n" +
    "                                <br>\n" +
    "                                {{item.description}}\n" +
    "                                <br>\n" +
    "                                <em>{{item.source}}</em>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"ctrl.addNewItem()\">New</button>\n" +
    "                                    \n" +
    "                    <img src=\"assets/item_weight.png\" width=\"32\"> {{ctrl.itemWeight}}\n" +
    "                    <img src=\"assets/item_darkstone.png\" width=\"32\"> {{ctrl.itemDarkstone}}\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "                <div class=\"abilities\">\n" +
    "                    <h4>Abilities</h4>\n" +
    "                    <div ng-repeat=\"(name, desc) in ctrl.character.abilities\">\n" +
    "                        <strong>{{name}}</strong> <small>{{desc}}</small>\n" +
    "                        <br><br>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"grid grid--bleed\">\n" +
    "                        <div class=\"grid__col-md-5\">\n" +
    "                            <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "                                ng-model=\"ctrl.newAbility.name\">\n" +
    "                        </div>\n" +
    "                        <div class=\"grid__col-md-7\">\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" \n" +
    "                                    ng-model=\"ctrl.newAbility.desc\">\n" +
    "                                <span class=\"input-group-btn\">\n" +
    "                                    <button type=\"button\" class=\"btn btn-success\" \n" +
    "                                        ng-disabled=\"!ctrl.newAbility.name\" \n" +
    "                                        ng-click=\"ctrl.addNewAbility()\">+</button>\n" +
    "                                </span>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"footer\">\n" +
    "\n" +
    "        <div class=\"grid\">\n" +
    "\n" +
    "            <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "                <div>\n" +
    "                    <div class=\"level\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Level</label>\n" +
    "                            <div class=\"value\">{{ctrl.character.level}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"xp\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>XP</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                            <img src=\"assets/xp.png\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"wealth\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>Gold</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                            <img src=\"assets/wealth.png\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"darkstone\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>Dark Stone</label> -->\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                            <img src=\"assets/darkstone.png\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"grid grid--bleed grid--wrap-reverse\">\n" +
    "\n" +
    "                    <!-- Sidebag -->\n" +
    "                    <div class=\"grid__col-xs-5 grid__col-sm-4\">\n" +
    "                        <div class=\"sidebag\">\n" +
    "                            <h4>Side Bag</h4>\n" +
    "\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Bandages</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.bandages\"></div>\n" +
    "                                <img src=\"assets/bandages.png\">\n" +
    "                            </div>    \n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Whiskey</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.whiskey\"></div>\n" +
    "                                <img src=\"assets/whiskey.png\">\n" +
    "                            </div>    \n" +
    "                            <br>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Tonic</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.tonic\"></div>\n" +
    "                                <img src=\"assets/tonic.png\">\n" +
    "                            </div>    \n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Herbs</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.herbs\"></div>\n" +
    "                                <img src=\"assets/herb.png\">\n" +
    "                            </div>    \n" +
    "                            <br>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Dynamite</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.dynamite\"></div>\n" +
    "                                <img src=\"assets/dynamite.png\">\n" +
    "                            </div>    \n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Flash</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.flash\"></div>\n" +
    "                                <img src=\"assets/flash.png\">\n" +
    "                            </div>    \n" +
    "                            <br>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Swamp Fungus</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.fungus\"></div>\n" +
    "                                <img src=\"assets/fungus.png\">\n" +
    "                            </div>    \n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Capacity</label>\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sidebag.capacity\"></div>\n" +
    "                            </div>    \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"grid__col-xs-7 grid__col-sm-8\">\n" +
    "\n" +
    "                        <div class=\"health\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Max Health</label>\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.health.max\"></div>\n" +
    "                            </div>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <img src=\"assets/wealth.png\">\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "                                <img src=\"assets/wound.png\">    \n" +
    "                            </div>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Defense</label>\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"sanity\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Max Sanity</label>\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "                            </div>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Loss</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                    ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "                                <img src=\"assets/sanity.png\">\n" +
    "                            </div>\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Willpower</label>\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <div class=\"clearfix\">\n" +
    "                            <div class=\"faith\">\n" +
    "                                <div class=\"stat\">\n" +
    "                                    <label>Max Faith</label>\n" +
    "                                    <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.faith\"></div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"corruption\">\n" +
    "                                <div class=\"stat\">\n" +
    "                                    <label>Max Corruption</label>\n" +
    "                                    <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "                                </div>\n" +
    "                                <div class=\"stat\">\n" +
    "                                    <!-- <label>Current</label> -->\n" +
    "                                    <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                        ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "                                    <img src=\"assets/corruption.png\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div>\n" +
    "                            <div class=\"movement\">\n" +
    "                                <div class=\"stat\">\n" +
    "                                    <label>Move</label>\n" +
    "                                    <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.movement\"></div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"grit\">\n" +
    "                                <div class=\"stat\">\n" +
    "                                    <label>Max Grit</label>\n" +
    "                                    <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "                                </div>\n" +
    "                                <div class=\"stat\">\n" +
    "                                    <label>Current</label>\n" +
    "                                    <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.current\"></div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "                <div class=\"clothing\">\n" +
    "                    <h4>Clothing</h4>\n" +
    "                    <div ng-repeat=\"(slotName,slot) in ctrl.character.clothing\" class=\"media\">\n" +
    "                        <div class=\"media-left\">\n" +
    "                            <strong>{{slotName}}: </strong>\n" +
    "                        </div>\n" +
    "                        <div class=\"media-body\">\n" +
    "                            <div ng-repeat=\"(name,desc) in slot\">\n" +
    "                                {{name}} <small>{{desc}}</small>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"mutations\">\n" +
    "                    <h4>Mutations &amp; Injuries</h4>\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\">\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-success\">+</button>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('home/home.html',
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"alert alert-danger\" ng-if=\"ctrl.displayOpts.error\">{{ctrl.displayOpts.error}}</div>\n" +
    "    \n" +
    "    <div ng-if=\"ctrl.displayOpts.loading\">Fetching data...</div>\n" +
    "    \n" +
    "    <div class=\"list-group\">\n" +
    "        <div class=\"list-group-item disabled\">\n" +
    "            <h4 class=\"list-group-item-heading\">Characters</h4>\n" +
    "            <p class=\"list-group-item-text\">Select a character from the list</p>\n" +
    "        </div>\n" +
    "        <a ng-repeat=\"name in ctrl.chars\" \n" +
    "            class=\"list-group-item\" \n" +
    "            href=\"#/{{name|encode}}\">{{name}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-success\"\n" +
    "        title=\"Create a new character\" \n" +
    "        ng-click=\"ctrl.createCharacter()\">\n" +
    "        New\n" +
    "    </button>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('item.html',
    "<div class=\"modal-content\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Name\">\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.description\" placeholder=\"Description\">\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source\">\n" +
    "\n" +
    "        <div>\n" +
    "            <label>Weight: <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label>Darkstone: <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label>Num Hands: <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label>Upgrade Slots:<input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('keypad.html',
    "<div class=\"modal-content keypad\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <h3>Current: {{value}}</h3>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-10)\">-10</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-5)\">-5</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-2)\">-2</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-1)\">-1</button>\n" +
    "        <br>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(1)\">1</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(2)\">2</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(3)\">3</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(4)\">4</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(5)\">5</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(10)\">10</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(15)\">15</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(20)\">20</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(25)\">25</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(30)\">30</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(35)\">35</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(40)\">40</button>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
