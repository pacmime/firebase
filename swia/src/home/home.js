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