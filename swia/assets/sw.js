(function(angular) {
    
    "use strict";

    var app = angular.module("character", ['ngSanitize', "firebase"]);

    app.filter('colorize', function($sce) {
        return function(input) {
            var html = "";
            if(input) {
                html = input.replace(/black/gi, '<div class="color-icon black"></div>')
                            .replace(/blue/gi, '<div class="color-icon blue"></div>')
                            .replace(/green/gi, '<div class="color-icon green"></div>')
                            .replace(/red/gi, '<div class="color-icon red"></div>')
                            .replace(/white/gi, '<div class="color-icon white"></div>')
                            .replace(/yellow/gi, '<div class="color-icon yellow"></div>');
            }
            return $sce.trustAsHtml(html);
        };
    });

    app.factory("Character", ["$firebaseObject",
        function($firebaseObject) {
            return function(campaign, character) {
                var ref = new Firebase("https://intense-fire-8692.firebaseio.com/saved/" + campaign + "/" + character);
                return $firebaseObject(ref);
            }
        }
    ]);

    app.factory("CharacterInfo", ["$firebaseArray",
        function($firebaseArray) {
            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/base/characters");
            return $firebaseArray(ref);
        }
    ]);


    app.controller("CharacterController", [
        "$scope", "$routeParams", "$compile", "Character", "CharacterInfo",
        function($scope, $routeParams, $compile, Character, CharacterInfo) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };

        //load the campaign
        var campName = decodeURIComponent($routeParams.campId);
        var charName = decodeURIComponent($routeParams.charId);
        this.character = Character(campName, charName);
        this.character.$loaded().then(function() {

            //load base information
            CharacterInfo.$loaded().then(function() {
                self.baseData = CharacterInfo.find(function(c){return c.name === self.character.name;});
                self.displayOpts.loading = false;

            }).catch(function(error) {
                self.displayOpts.loading = false;
                self.displayOpts.error = error.data;
            });

        }).catch(function(error) {
            self.displayOpts.loading = false;
            self.displayOpts.error = error.data;
        });


        function getAbilityCost(ability) {
            return ability.cost.replace(/\s*xp\s*/i, '')*1;
        }


        //
        this.increaseXP = function() {
            this.character.xp += 1;
            this.character.$save();
        };


        //@return true|false or string message if false
        this.canPurchase = function(ability) {
            if(this.character.xp < getAbilityCost(ability)) return false;

            return !this.character.abilities || 
                !this.character.abilities.find(function(a) {return a.name === ability.name;});
        };

        this.hasEnoughXP = function(ability) {
            if(this.character.xp >= getAbilityCost(ability)) return "";
            else "Insufficent XP"
        }


        //
        this.purchaseAbility = function(ability) {
            this.character.abilities = this.character.abilities || [];
            this.character.abilities.push(angular.copy(ability));
            this.character.xp -= getAbilityCost(ability);
            this.character.$save();
            this.displayOpts.displayPicker = false;
        };

        //
        this.increaseStat = function(name) {
            
            if(name === 'strain') {
                this.character.stats[name] += 1;

            } else if(name === 'health') {
                var max = this.baseData[this.character.condition].health;
                if(this.character.stats[name] !== max)
                    this.character.stats[name] += 1;
            }

            this.character.$save();
        };

        //
        this.decreaseStat = function(name) {
            
            if(name === 'health') {
                if(this.character.stats[name] === 1) {
                    if(this.character.condition === 'wounded') {
                        //TODO dead
                        this.character.stats[name] = 0;

                    } else {
                        //wounded
                        this.character.condition = 'wounded';
                        this.character.stats[name] = this.baseData[this.character.condition].health;
                    }
                } else 
                    this.character.stats[name] -= 1;
            }
            if(name === 'strain') {
                if(this.character.stats[name] > 0)
                    this.character.stats[name] -= 1;
            }
            this.character.$save();
        };

    }]);


    angular.module('character').directive("abilities", function() {

        return {
            restrict: "AE",
            templateUrl: 'src/character/abilities.html', 
            link: function($scope, $element) {



            }
        };

    });

}) (angular);
;
(function(angular) {
    
    "use strict";

    var app = angular.module("campaign", ["firebase"]);

    app.factory("Campaign", ["$firebaseObject",
        function($firebaseObject) {
            return function(campaign) {
                var ref = new Firebase("https://intense-fire-8692.firebaseio.com/saved/" + campaign);
                return $firebaseObject(ref);
            }
        }
    ]);

    app.factory("CharacterChoices", ["$firebaseArray",
        function($firebaseArray) {

            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/base/characters");

            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        }
    ]);


    app.controller("CampaignController", [
        "$scope", "$routeParams", "Campaign", "CharacterChoices", 
        function($scope, $routeParams, Campaign, CharacterChoices) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null,
            displayChoices: false
        };

        //load the campaign
        var campaignName = this.campId = decodeURIComponent($routeParams.id);
        this.campaign = Campaign(campaignName);
        this.campaign.$loaded().then(function() {
            self.displayOpts.loading = false;
        }).catch(function(error) {
            self.displayOpts.loading = false;
            self.displayOpts.error = error.data;
        });


        //load base class options
        this.choices = CharacterChoices;
        

        //is this character already chosen in this campaign?
        this.campaignHasChar = function(character) {
            var charName = character.name;
            for(var id in this.campaign) {
                if(this.campaign[id] && this.campaign[id].name && 
                    this.campaign[id].name===charName)
                    return true;
            }
            return false;
        };

        //create char from base classes
        this.createFrom = function(character) {

            //hide choice list
            self.displayOpts.displayChoices = false;
                
            var id = Math.floor(Math.random()*999999);

            //append character to loaded campaign
            self.campaign[id] = {
                name: character.name,
                condition: "normal",
                stats: {
                    strain: 0,
                    health: character.normal.health
                },
                weapons: [character.weapons[0]]
            };

            //and save the now changed campaign
            campaign.$save().then(function() {
                updateCampaignList();
                self.displayOpts.message = "Character created";
            }).catch(function(error) {
                self.error = "Failed to save new character: " + error.data;
            });

        };

    }]);

}) (angular);
;
(function(angular) {
    
    "use strict";

    var app = angular.module("home", ["firebase", "campaign"]);

    
    app.factory("SavedInfo", ["$firebaseObject",
        function($firebaseObject) {
            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/saved");
            return $firebaseObject(ref);
        }
    ]);

    
    app.controller("HomeController", [
        "$scope", "$timeout", "SavedInfo", "Campaign",
        function($scope, $timeout, SavedInfo, Campaign) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };


        //load saved campaigns
        SavedInfo.$loaded().then(function() {
            updateCampaignList();
            self.displayOpts.loading = false;
        }).catch(function(error) {
            self.displayOpts.error = "Failed to load saved data: " + error.data;
        });
        

        function updateCampaignList() {
            var camps = [];
            angular.forEach(SavedInfo, function(value, key) { 
                camps.push({
                    name: key,
                    numChars: Object.keys(value).length
                }); 
            });
            self.campaigns = camps;
        }


        //methods

        this.createCampaign = function() {
            var campaignName = prompt("Give the campaign a name:");
            SavedInfo[campaignName] = {};
            SavedInfo.$save().then(updateCampaignList).catch(function(err) {
                self.displayOpts.error = "Failed to create campaign " + err.data;
            });
        };


    }]);

}) (angular);
;
(function(angular) {

    "use strict";

    angular.module("app", ['ngRoute', 'home', 'campaign', 'character'])

    .config(function myAppConfig ($routeProvider, $locationProvider) {
        
        //default route if invalid one is supplied
        $routeProvider
        .when('/', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeController as ctrl'
        })
        .when('/campaign/:campId/:charId', {
            templateUrl: 'src/character/character.html',
            controller: 'CharacterController as ctrl'
        })
        .when('/campaign/:id', {
            templateUrl: 'src/campaign/campaign.html',
            controller: 'CampaignController as ctrl'
        })
        
        .otherwise({ redirectTo: "/" });
      
        //http://stackoverflow.com/questions/17895675/angularjs-html5mode-refresh-page-get-404
        // $locationProvider.html5Mode(true);

        if(!(window.history && history.pushState))
            console.log("Your browser does not support HTML5 mode");
    })

    
})(angular);

;
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('campaign/campaign.html',
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"alert alert-danger\" ng-if=\"ctrl.displayOpts.error\">{{ctrl.displayOpts.error}}</div>\n" +
    "    \n" +
    "    <div ng-if=\"ctrl.displayOpts.loading\">Fetching data...</div>\n" +
    "\n" +
    "    <h3>Campaign: {{ctrl.campId}}</h3>\n" +
    "    \n" +
    "    <div class=\"list-group\">\n" +
    "        <div class=\"list-group-item disabled\">\n" +
    "            <h4 class=\"list-group-item-heading\">Characters</h4>\n" +
    "            <p class=\"list-group-item-text\">Select your character from the list below or click 'New Character' to create one.</p>\n" +
    "        </div>\n" +
    "        <a ng-repeat=\"(id,character) in ctrl.campaign\" class=\"list-group-item\" href=\"#/campaign/{{ctrl.campId}}/{{id}}\">\n" +
    "            {{character.name}} \n" +
    "            ( \n" +
    "            <span class=\"glyphicon glyphicon-heart\" title=\"Health\"></span> {{character.stats.health}} / \n" +
    "            <span class=\"glyphicon glyphicon-user\" title=\"Strain\"></span> {{character.stats.strain}}\n" +
    "            )\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" \n" +
    "        ng-if=\"!ctrl.displayOpts.displayChoices\" \n" +
    "        ng-click=\"ctrl.displayOpts.displayChoices=true\">\n" +
    "        New Character\n" +
    "    </button>\n" +
    "    \n" +
    "    <div class=\"list-group\" ng-if=\"ctrl.displayOpts.displayChoices\">\n" +
    "        <h5 class=\"list-group-item disabled\">Which character do you want to use?</h5>\n" +
    "        <div ng-repeat=\"character in ctrl.choices\" class=\"list-group-item\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-primary\"\n" +
    "                ng-disabled=\"ctrl.campaignHasChar(character)\"\n" +
    "                ng-click=\"ctrl.createFrom(character)\">\n" +
    "                <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "            </button>\n" +
    "            {{character.name}} <em>({{character['class']}})</em>\n" +
    "        </div>\n" +
    "        <div class=\"list-group-item\">\n" +
    "            <button type=\"button\" class=\"btn btn-default\" \n" +
    "                ng-click=\"ctrl.displayOpts.displayChoices=false\">\n" +
    "                Cancel\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div> \n" +
    "\n" +
    "</div>"
  );


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
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"char {{ctrl.character.condition}}\">\n" +
    "\n" +
    "        <div class=\"label\">\n" +
    "            <div class=\"pull-right\">\n" +
    "                {{ctrl.character.xp}} XP\n" +
    "                <button type=\"button\" class=\"btn btn-link btn-xs\" ng-click=\"ctrl.increaseXP()\" title=\"earn XP\">\n" +
    "                    <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <h4>{{ctrl.character.name}}</h4>\n" +
    "            <h6>{{ctrl.baseData['class']}}</h6>\n" +
    "        </div>\n" +
    "\n" +
    "        <img class=\"image\" src=\"assets/{{ctrl.baseData.image}}\">\n" +
    "\n" +
    "        <abilities />\n" +
    "        \n" +
    "        <div class=\"stats\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div class=\"btn-group-vertical pull-right\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"ctrl.increaseStat('health')\">\n" +
    "                                <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                            </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"ctrl.decreaseStat('health')\">\n" +
    "                                <span class=\"glyphicon glyphicon-minus\"></span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <h5 style=\"color: #f00\">Health</h5>\n" +
    "                        {{ctrl.character.stats.health}} / {{ctrl.baseData[ctrl.character.condition].health}}\n" +
    "                \n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div class=\"btn-group-vertical pull-right\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"ctrl.increaseStat('strain')\">\n" +
    "                                <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "                            </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"ctrl.decreaseStat('strain')\">\n" +
    "                                <span class=\"glyphicon glyphicon-minus\"></span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                        <h5 style=\"color:#00f\">Strain</h5> \n" +
    "                        {{ctrl.character.stats.strain}} / {{ctrl.baseData[ctrl.character.condition].endurance}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <div class=\"stat\"><h5>Speed</h5> {{ctrl.baseData[ctrl.character.condition].speed}}</div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-3\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <h5>Defense</h5> \n" +
    "                        <div ng-bind-html=\"ctrl.baseData[ctrl.character.condition].defense | colorize\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <div class=\"skill\" title=\"Strength\">\n" +
    "                        <span class=\"glyphicon glyphicon-hand-up\"></span> \n" +
    "                        <span ng-bind-html=\"ctrl.baseData[ctrl.character.condition].actions.strength | colorize\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <div class=\"skill\" title=\"Insight\">\n" +
    "                        <span class=\"glyphicon glyphicon-eye-open\"></span> \n" +
    "                        <span ng-bind-html=\"ctrl.baseData[ctrl.character.condition].actions.insight | colorize\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-4\">\n" +
    "                    <div class=\"skill\" title=\"Tech\">\n" +
    "                        <span class=\"glyphicon glyphicon-wrench\"></span> \n" +
    "                        <span ng-bind-html=\"ctrl.baseData[ctrl.character.condition].actions.tech | colorize\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "      \n" +
    "    </div>\n" +
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
    "            <h4 class=\"list-group-item-heading\">Campaigns</h4>\n" +
    "            <p class=\"list-group-item-text\">First, select a campaign. From there you will have access to your character in that campaign or be able to create a new character for use in that campaign.</p>\n" +
    "        </div>\n" +
    "        <a ng-repeat=\"campaign in ctrl.campaigns\" class=\"list-group-item\" href=\"#/campaign/{{campaign.name}}\">\n" +
    "            {{campaign.name}} ({{campaign.numChars}})\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-primary\"\n" +
    "        title=\"Create a new campaign\" ng-click=\"ctrl.createCampaign()\">\n" +
    "        New Campaign\n" +
    "    </button>\n" +
    "            \n" +
    "\n" +
    "</div>"
  );

}]);
