(function(angular) {
    
    "use strict";

    var app = angular.module("home", ["firebase", "common"]);

    
    app.component("swiaHome", {
        
        templateUrl: 'src/home/home.html',
        controller: function($timeout, $firebaseAuth, CampaignChoices) {
                
            this.$onInit = function() {
                this.displayOpts = {
                    loading: false,
                    message: null,
                    error: null
                };


                // check that user is authenticated
                var auth = $firebaseAuth();
                auth.$onAuthStateChanged( (authData) => {
                    this.user = authData;
                    if(authData && authData.uid) {
                        //if so, load campaigns information
                        this.updateList();
                    } else {
                        //otherwise, forget currently loaded campaigns info
                        if(this.campaigns) {
                            this.campaigns.$destroy();
                        }
                    }
                });
                
            };

            //load saved campaigns
            this.updateList = function() {
                this.displayOpts.loading = true;
                this.campaigns = CampaignChoices;
                this.campaigns.$loaded().then(() => {
                    this.displayOpts.loading = false;
                }).catch(function(error) {
                    this.displayOpts.error = "Failed to load saved data: " + error.data;
                });
            };
            

            //methods

            this.createCampaign = function() {
                if(!this.user || !this.user.uid) return;

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