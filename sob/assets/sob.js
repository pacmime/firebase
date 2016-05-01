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

                    var value = ngModelController.$modelValue;

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
                        // scope.onSave();
                    }, function () { });

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


        this.save = function() {
            this.character.$save();
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


        //methods

        // this.createCampaign = function() {
        //     var campaignName = prompt("Give the campaign a name:");
        //     DataStore[campaignName] = {};
        //     DataStore.$save().then(updateCampaignList).catch(function(err) {
        //         self.displayOpts.error = "Failed to create campaign " + err.data;
        //     });
        // };


    }]);

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

  $templateCache.put('character/abilities.html',
    "<div class=\"abilities\">\n" +
    "\n" +
    "    <!-- Purchased Abilities -->\n" +
    "    <div class=\"list-group\" ng-if=\"!ctrl.displayOpts.displayPicker\">\n" +
    "\n" +
    "        <h5 class=\"list-group-item disabled\">\n" +
    "            <button type=\"button\" class=\"btn btn-xs btn-primary pull-right\" \n" +
    "                title=\"Choose abilities to add\" ng-click=\"ctrl.displayOpts.displayPicker=true\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "            </button>\n" +
    "            Abilities\n" +
    "        </h5>\n" +
    "\n" +
    "        <!-- default abilities (condition-based) -->\n" +
    "        <div ng-repeat=\"ability in ctrl.baseData[ctrl.character.condition].abilities\" class=\"list-group-item\">\n" +
    "            <h5 class=\"list-group-heading\">{{ability.name}}</h5>\n" +
    "            <div class=\"list-group-text\">\n" +
    "                {{ability.description}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <!-- purchased via xp -->\n" +
    "        <div ng-repeat=\"ability in ctrl.character.abilities\" class=\"list-group-item\">\n" +
    "            <h5 class=\"list-group-heading\">{{ability.name}}</h5>\n" +
    "            <div class=\"list-group-text\">\n" +
    "                <ul><li ng-repeat=\"effect in ability.effects\">{{effect}}</li></ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <!-- Weapons -->\n" +
    "        <h5 class=\"list-group-item disabled\">Weapons</h5>\n" +
    "        <div ng-repeat=\"weapon in ctrl.character.weapons\" class=\"list-group-item\">\n" +
    "            <h5 class=\"list-group-item-heading\">{{weapon.name}}</h5>\n" +
    "            <div>\n" +
    "                <span class=\"pull-right\" ng-bind-html=\"weapon.attack|colorize\"></span>\n" +
    "                {{weapon.type}}\n" +
    "            </div>\n" +
    "            <ul><li ng-repeat=\"effect in weapon.effects\">{{effect}}</li></ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!-- Available Abilities -->\n" +
    "    <div class=\"list-group\" ng-if=\"ctrl.displayOpts.displayPicker\">\n" +
    "\n" +
    "        <h5 class=\"list-group-item disabled\">\n" +
    "            <button type=\"button\" class=\"btn btn-xs btn-default pull-right\" \n" +
    "                title=\"Choose abilities to add\" ng-click=\"ctrl.displayOpts.displayPicker=false;\">\n" +
    "                <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "            </button>\n" +
    "            Choose New Abilities\n" +
    "        </h5>\n" +
    "        <div ng-repeat=\"ability in ctrl.baseData.abilities\" class=\"list-group-item\">\n" +
    "            <h5 class=\"list-group-heading\">{{ability.name}}</h5>\n" +
    "            <div class=\"list-group-text\">\n" +
    "                <strong>{{ability.cost}}</strong>\n" +
    "                <ul><li ng-repeat=\"effect in ability.effects\">{{effect}}</li></ul>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-success\" \n" +
    "                    title=\"{{ctrl.hasEnoughXP(ability)}}\"\n" +
    "                    ng-class=\"{disabled:!ctrl.canPurchase(ability)}\"\n" +
    "                    ng-click=\"ctrl.purchaseAbility(ability)\">\n" +
    "                    Purchase\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/character.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-5 col-md-7 col-lg-8\">\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "                    <div><label>Class: </label> {{ctrl.character.class}}</div>\n" +
    "                    <div><label>Keywords: </label> {{ctrl.character.keywords}}</div>\n" +
    "\n" +
    "                    <div>\n" +
    "                        <div><label>To Hit:</label></div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-7 col-md-5 col-lg-4\">\n" +
    "\n" +
    "                    <div class=\"stats\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Agility</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.stats.Agility\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Cunning</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.stats.Cunning\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Strength</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.stats.Strength\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Lore</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.stats.Lore\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Initiative</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.init\"></div>\n" +
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
    "                <div class=\"col-sm-6\">\n" +
    "                    <div class=\"items\">\n" +
    "                        <h4>Items</h4>\n" +
    "\n" +
    "                        <table class=\"table\">\n" +
    "                            <thead>\n" +
    "                                <tr>\n" +
    "                                    <th>A</th>\n" +
    "                                    <th>D</th>\n" +
    "                                    <th>H</th>\n" +
    "                                    <th>U</th>\n" +
    "                                    <th width=\"70%\">Name + Description</th>\n" +
    "                                </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                                <tr ng-repeat=\"(name, item) in ctrl.character.items\">\n" +
    "                                    <td>{{item.weight}}</td>\n" +
    "                                    <td>{{item.darkstone}}</td>\n" +
    "                                    <td>{{item.hands}}</td>\n" +
    "                                    <td>{{item.slots}}</td>\n" +
    "                                    <td><strong>{{name}}: </strong> {{item.description}} [{{item.source}}]\n" +
    "                                </tr>\n" +
    "                            </tbody>\n" +
    "                            <tfoot>\n" +
    "                                <tr>\n" +
    "                                    <td colspan=\"4\">Weight: {{ctrl.itemWeight}}</td>\n" +
    "                                    <td>\n" +
    "                                        <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"ctrl.addNewItem()\">New</button>\n" +
    "                                        Darkstone: {{ctrl.itemDarkstone}}\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                            </tfoot>\n" +
    "                        </table>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-6\">\n" +
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
    "                <div class=\"col-sm-6\">\n" +
    "\n" +
    "                    <div class=\"level\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Level</label>\n" +
    "                            <div class=\"value\">{{ctrl.character.level}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>XP</label>\n" +
    "                        <div class=\"value--sm\" editable-stat-value ng-model=\"ctrl.character.xp\"></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Gold</label>\n" +
    "                        <div class=\"value--sm\" editable-stat-value ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"darkstone\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Dark Stone</label>\n" +
    "                            <div editable-stat-value ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <br>\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"row row--no-gutter\">\n" +
    "\n" +
    "                            <div class=\"col-sm-8 col-sm-push-4\">\n" +
    "                                <div class=\"clearfix\">\n" +
    "                                    <div class=\"health\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Health</label>\n" +
    "                                            <div editable-stat-value ng-model=\"ctrl.character.health.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Wounds</label>\n" +
    "                                            <div editable-stat-value ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Defense</label>\n" +
    "                                            <div editable-stat-value ng-model=\"ctrl.character.defense\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"sanity\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Sanity</label>\n" +
    "                                            <div editable-stat-value ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Loss</label>\n" +
    "                                            <div editable-stat-value ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Willpower</label>\n" +
    "                                            <div editable-stat-value ng-model=\"ctrl.character.willpower\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    \n" +
    "                                    <div class=\"clearfix\">\n" +
    "                                        <div class=\"faith\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Faith</label>\n" +
    "                                                <div editable-stat-value ng-model=\"ctrl.character.faith\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"corruption\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Corruption</label>\n" +
    "                                                <div editable-stat-value ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Current</label>\n" +
    "                                                <div editable-stat-value ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div>\n" +
    "                                        <div class=\"movement\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Move</label>\n" +
    "                                                <div editable-stat-value ng-model=\"ctrl.character.movement\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"grit\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Grit</label>\n" +
    "                                                <div editable-stat-value ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Current</label>\n" +
    "                                                <div editable-stat-value ng-model=\"ctrl.character.grit.current\"></div>\n" +
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
    "                                        <label>Bandages</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.bandages\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Whiskey</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.whiskey\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Tonic</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.tonic\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Herbs</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.herbs\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Dynamite</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.dynamite\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Flash</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.flash\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Swamp Fungus</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.fungus\"></div>\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Capacity</label>\n" +
    "                                        <div editable-stat-value ng-model=\"ctrl.character.sidebag.capacity\"></div>\n" +
    "                                    </div>    \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-6\">\n" +
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
    "        <a ng-repeat=\"name in ctrl.chars\" class=\"list-group-item\" href=\"#/{{name|encode}}\">{{name}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- <button type=\"button\" class=\"btn btn-primary\"\n" +
    "        title=\"Create a new campaign\" ng-click=\"ctrl.createCampaign()\">\n" +
    "        New Campaign\n" +
    "    </button> -->\n" +
    "            \n" +
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
    "        <label>Current: {{value}}</label><br><br>\n" +
    "        \n" +
    "        <button type=\"button\" ng-click=\"change(-10)\">-10</button>\n" +
    "        <button type=\"button\" ng-click=\"change(-5)\">-5</button>\n" +
    "        <button type=\"button\" ng-click=\"change(-2)\">-2</button>\n" +
    "        <button type=\"button\" ng-click=\"change(-1)\">-1</button>\n" +
    "        <br>\n" +
    "\n" +
    "        <button type=\"button\" ng-click=\"change(1)\">1</button>\n" +
    "        <button type=\"button\" ng-click=\"change(2)\">2</button>\n" +
    "        <button type=\"button\" ng-click=\"change(3)\">3</button>\n" +
    "        <button type=\"button\" ng-click=\"change(4)\">4</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" ng-click=\"change(5)\">5</button>\n" +
    "        <button type=\"button\" ng-click=\"change(10)\">10</button>\n" +
    "        <button type=\"button\" ng-click=\"change(15)\">15</button>\n" +
    "        <button type=\"button\" ng-click=\"change(20)\">20</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" ng-click=\"change(25)\">25</button>\n" +
    "        <button type=\"button\" ng-click=\"change(30)\">30</button>\n" +
    "        <button type=\"button\" ng-click=\"change(35)\">35</button>\n" +
    "        <button type=\"button\" ng-click=\"change(40)\">40</button>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
