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

    app.controller("CampaignController", [
        "$scope", "$routeParams", "Campaign",
        function($scope, $routeParams, Campaign) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
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


    }]);

}) (angular);