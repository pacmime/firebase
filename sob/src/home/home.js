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