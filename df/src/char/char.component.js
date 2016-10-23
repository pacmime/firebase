(function(angular) {
    
    "use strict";



    class CharController {

        constructor (CharacterRef, PowerLevels, Templates, $firebaseAuth, $timeout, $stateParams) {
            'ngInject';

            this.charId = $stateParams.id;
            this.store = CharacterRef;
            this.auth = $firebaseAuth();
            this.levels = PowerLevels;
            this.templates = Templates;
            this.timeout = $timeout;
        }

        $onInit () {
            this.displayOpts = {
                loading: false,
                message: null,
                error: null
            };

            let loadback = () => {
                this.displayOpts.loading = false;
                this.refresh();
            };
            let errback = (error) => 
                this.displayOpts.error = "Failed to load character: " + error.data;

            let callback = (authData) => {
                this.user = authData;

                if(authData && authData.uid) {
                    this.displayOpts.loading = true;
                    this.character = this.store(this.charId);
                    this.character.$loaded().then(loadback).catch(errback);

                } else if(this.character) {
                    this.character.$destroy();
                }
            };

            this.auth.$onAuthStateChanged(callback);
        }

        $onDestroy () {
            this.charId = null;
            this.store = null;
            this.auth = null;
            this.levels = null;
            this.templates = null;
            this.timeout = null;
        }


        refresh () {
            var cost = 0;
            angular.forEach(this.character.powers, (power) => {
                cost += power.cost; //NOTE: costs are negative
            });
            this.adjustedRefresh = this.character.baseRefresh + cost;
        }

        onPowerLevelChange () {
            var level = this.levels[this.character.powerLevel];
            this.character.skillCap = level.skillCap;
            this.character.baseRefresh = level.baseRefresh;
            this.refresh();
            this.save();
        }

        save () {

            if(this.debounce) {
                this.timeout.cancel(this.debounce);
                this.debounce = null;
            }

            this.debounce = this.timeout( () => {

                this.debounce = null;

                this.character.$save().then(
                    () => {
                        this.displayOpts.showSave = true;
                        this.timeout(() => {this.displayOpts.showSave = false;}, 1500);
                    }, 
                    (error) => {
                        alert("There was an error");
                    });

            },250);

        }

    }



    var app = angular.module("dresden.char").component("character", {
        templateUrl: 'char/char.component.html',
        controller: CharController
    });

}) (angular);