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