(function(angular) {
    
    "use strict";

    window.UUID = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    window.angularFireCopy = function(angularFireObj) {
        var result = {};
        for (var key in angularFireObj) {
           if (key.indexOf('$') < 0 && angularFireObj.hasOwnProperty(key)) {
              result[key] = angularFireObj[key];
           };
        }
        return result;
    }





    var app = angular.module("common", ["firebase", 'ngSanitize']);

    app.factory("CampaignChoices", ["$firebaseObject",
        function($firebaseObject) {
            var root = firebase.database().ref();
            var ref = root.child('ImperialAssault/campaigns');
            return $firebaseObject(ref);
        }
    ]);

    app.factory("Campaign", ["$firebaseObject",
        function($firebaseObject) {
            return function(campaign) {
                var root = firebase.database().ref();
                var ref = root.child('ImperialAssault/campaigns/' + campaign);
                return $firebaseObject(ref);
            }
        }
    ]);

    app.factory("ItemChoices", ["$firebaseObject",
        function($firebaseObject) {
            var root = firebase.database().ref();
            var ref = root.child('ImperialAssault/items');
            return $firebaseObject(ref);
        }
    ]);

    app.factory("CharacterChoices", ["$firebaseObject",
        function($firebaseObject) {
            var root = firebase.database().ref();
            var ref = root.child('ImperialAssault/characters');
            return $firebaseObject(ref);
        }
    ]);

    app.factory("Character", ["$firebaseObject",
        function($firebaseObject) {
            return function(campaign, character) {
                var root = firebase.database().ref();
                var ref = root.child('ImperialAssault/campaigns/' + campaign + '/characters/' + character);
                return $firebaseObject(ref);
            }
        }
    ]);



    app.filter('colorize', function($sce) {
        return function(input) {
            var html = "";
            if(input) {
                html = input.replace(/color\:black/gi, ' <div class="color-icon black"></div> ')
                            .replace(/color\:blue/gi, ' <div class="color-icon blue"></div> ')
                            .replace(/color\:green/gi, ' <div class="color-icon green"></div> ')
                            .replace(/color\:red/gi, ' <div class="color-icon red"></div> ')
                            .replace(/color\:white/gi, ' <div class="color-icon white"></div> ')
                            .replace(/color\:yellow/gi, ' <div class="color-icon yellow"></div> ');
            }
             $sce.trustAsHtml(html);
             return html;
        };
    });


    app.filter('listify', function($sce) {
        return function(input) {
            var html = input;
            if(html && html.length) {
                html = html.replace("1)", "&nbsp;&nbsp;&nbsp;• ")
                            .replace("2)", "<br>&nbsp;&nbsp;&nbsp;• ")
                            .replace("3)", "<br>&nbsp;&nbsp;&nbsp;• ")
                            .replace("4)", "<br>&nbsp;&nbsp;&nbsp;• ")
                            .replace("5)", "<br>&nbsp;&nbsp;&nbsp;• ");
            }
            $sce.trustAsHtml(html);
            return html;
        };
    });

    app.filter('iconify', function($sce) {
        return function(input) {
            var html = input;
            if(html && html.length) {
                html = html.replace(/Surge/gi, '<span class="image-icon surge"></span>')
                            .replace(/Strain/gi, '<span class="image-icon strain"></span>')
                            .replace(/Damage/gi, '<span class="image-icon damage"></span>')
                            .replace(/Action/gi, '<span class="image-icon action"></span>')
                            .replace(/Threat/gi, '<span class="image-icon threat"></span>')
                            .replace(/Block/gi, '<span class="image-icon block"></span>')
                            .replace(/Evade/gi, '<span class="image-icon evade"></span>')
                            .replace(/Ranged/gi, '<span class="image-icon ranged"></span>')
                            .replace(/Melee/gi, '<span class="image-icon melee"></span>');
            }
            $sce.trustAsHtml(html);
            return html;
        };
    });
    
    app.component('swiaDie', {
        bindings: {
            color: '@'
        },
        template: 
            `<button type="button" class="btn btn-die" ng-click="$ctrl.roll()">
                <span class="die-sprite is-rolling glyphicon glyphicon-hourglass" ng-if="$ctrl.rolling"></span>
                <div class="die-sprite die-{{$ctrl.color}}-{{$ctrl.face}}" ng-if="!$ctrl.rolling"></div>
            </button>`,
        controller: function($element, $timeout) {

            this.$onInit = function() {
                this.face = 1;
            };

            this.roll = function() {
                this.rolling = true;
                this.face = Math.floor( Math.random() * 60 * .10 ) + 1;
                $timeout( () => { this.rolling = false; }, 300);
            };

        }
    })

}) (angular);