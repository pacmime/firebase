(function(angular) {
    
    "use strict";

    var app = angular.module("sob-character", ['ngSanitize', 'ui.bootstrap', "firebase", 'sob-common']);

    
    app.controller("CharacterController", [
        "$scope", "$routeParams", "CharacterRef",
        function($scope, $routeParams, CharacterRef) {
        
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
            self.character.sidebag.spices = self.character.sidebag.spices || 0;
            self.character.sidebag.potions = self.character.sidebag.potions || 0;
            self.character.sidebag.hatchets = self.character.sidebag.hatchets || 0;
            self.character.sidebag.lanternOil = self.character.sidebag.lanternOil || 0;
            self.character.sidebag.exoticHerbs = self.character.sidebag.exoticHerbs || 0;
            self.character.sidebag.tequila = self.character.sidebag.tequila || 0;
            self.character.sidebag.cigars = self.character.sidebag.cigars || 0;
        });
        
        this.onInputKeyPress = function($event) {
            var key = $event.keyCode || $event.which;
            if(key === 13) {    //enter
                // this.save();
            }
        };


        this.save = function() {
            console.log("Saved");
            this.character.$save();
        };

        this.getAvailableSidebagCapacity = function() {
            if(!self.character.sidebag) return 0;
            return self.character.sidebag.capacity - (
                (self.character.sidebag.bandages||0) + 
                (self.character.sidebag.whiskey||0) + 
                (self.character.sidebag.tonic||0) + 
                (self.character.sidebag.herbs||0) + 
                (self.character.sidebag.dynamite||0) + 
                (self.character.sidebag.flash||0) + 
                (self.character.sidebag.fungus||0) + 
                (self.character.sidebag.spices||0) +  
                (self.character.sidebag.potions||0) +  
                (self.character.sidebag.hatchets||0) + 
                (self.character.sidebag.lanternOil||0) + 
                (self.character.sidebag.exoticHerbs||0) +  
                (self.character.sidebag.tequila||0) + 
                (self.character.sidebag.cigars||0)
            );

            
        };

    }])



    // .component('clothing', {
    //     bindings: {
    //         character: "=",
    //         type: "@",
    //         onSave: "&"
    //     },
    //     controller: function() {

    //         var self = this;
    //         this.init = function() {
    //             this.item = this.item || {name: null, desc: null};
    //             this.isEditing = false;
    //         }
    //         this.init();

    //         this.update = function() {
    //             var current = this.character.clothing && this.character.clothing[this.type];
    //             if(current) {
    //                 this.item.name = current.name;
    //                 this.item.desc = current.desc;
    //             }
    //         }
    //         this.character.$loaded().then(function() {
    //             self.update();
    //         });

    //         this.add = function() {
    //             if(!this.item.name) return;

    //             this.character.clothing = this.character.clothing || {}
    //             this.character.clothing[this.type] = this.item;
    //             this.onSave();
    //             this.update();
    //             this.init();
    //         };

    //         this.remove = function() {
    //             if(this.isRemoving === true) {
    //                 this.isRemoving = false;
    //                 this.character.clothing[this.type] = null;
    //                 this.item = null;
    //                 this.onSave();
    //                 this.update();
    //                 this.init();
    //             } else {
    //                 this.isRemoving = true;
    //             }
    //         };

    //     },
    //     templateUrl: 'src/character/clothing-item.html' 
    // })

    ;


}) (angular);