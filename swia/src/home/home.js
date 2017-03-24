(function(angular) {
    
    "use strict";

    var app = angular.module("home", ["firebase", "common"]);

    
    app.component("swiaHome", {
        
        templateUrl: 'src/home/home.html',
        controller: function($timeout, CampaignChoices) {
                
            this.$onInit = function() {
                this.displayOpts = {
                    loading: true,
                    message: null,
                    error: null
                };

                //load saved campaigns
                this.campaigns = CampaignChoices;
                this.campaigns.$loaded().then(() => {
                    this.displayOpts.loading = false;
                }).catch(function(error) {
                    this.displayOpts.error = "Failed to load saved data: " + error.data;
                });
            };
            

            //methods

            this.createCampaign = function() {
                var campaignName = prompt("Give the campaign a name:");
                this.campaigns[campaignName] = {};
                this.campaigns.$save()
                    .catch((err) => {
                        this.displayOpts.error = "Failed to create campaign " + err.data;
                    });
            };

        }
    });

}) (angular);