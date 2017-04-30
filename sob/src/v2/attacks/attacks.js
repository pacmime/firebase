(function(angular) {
    
    "use strict";


    angular.module("sob-character").component('attacks', {

        bindings: {
            character: "=",
            onSave: '&'
        },
            
        templateUrl: 'src/v2/attacks/attacks.html',
            
        controller: function() {

            this.$onInit = function() {
                this.confirmingDelete = {};
            };
                
            this.add = function() {
                
                if(!this.character.attacks)
                    this.character.attacks = {};

                this.character.attacks[Math.ceil(Math.random()*9999)] = {
                    name: "",
                    description: "",
                    toHit: "",
                    attack: "",
                    damage: ""
                };

                this.onSave();

            };

            this.remove = function(id) {
                delete this.character.attacks[id];
                delete this.confirmingDelete[id];
                this.onSave();
            };


            this.onChange = function() {
                this.onSave();
            };

            
            /**
             * @param {string} id - id of the attack to roll
             */
            this.roll = function(id) {

                var result = { attack: null, hits: [], dmg: [] };

                if('dynamite' === id) {
                    result.attack = this.parseAttackStats(id);
                    result.bounces = this.rollBounces();
                } else if('hatchet' === id) {
                    result.attack = this.parseAttackStats(id);
                } else {
                    var combat = this.character.attacks[id];
                    if(combat.attack && combat.type && combat.damage) {
                        result.attack = this.parseAttackStats(combat);
                    }
                }

                if(result.attack) {
                    var i=0, hits = 0;
                    while(i<result.attack.numAttDie) {

                        //roll to-hit
                        var roll = Math.ceil( Math.random() * result.attack.attDie );
                        if(result.attack.attMod)
                            roll += result.attack.attMod;
                        result.hits[i] = roll;

                        //roll damage
                        var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
                        if(result.attack.dmgMod)
                            dmg += result.attack.dmgMod;
                        result.dmg[i] = dmg*1;

                        if(roll >= result.attack.target) {  //if hit target, remove bounces
                            result.bounces = [];
                        } else if('dynamite' !== id) {      //if miss non-dyn, blank damage
                            result.dmg[i] = '-';
                        }
                            
                        i++;
                    }

                    this.rollResults = this.rollResults || {};
                    this.rollResults[id] = result;
                }
            };

            /**
             * reroll a to-hit value
             * @param {string} id - id of the attack containing the to-hit value
             * @param {integer} index - position of the to-hit value in the attack's array
             */
            this.rerollHit = function(id, index) {
                var result = this.rollResults[id];
                var roll = Math.ceil( Math.random() * result.attack.attDie );
                if(result.attack.attMod)
                    roll += result.attack.attMod;
                result.hits[index] = roll;

                var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
                if(result.attack.dmgMod)
                    dmg += result.attack.dmgMod;
                result.dmg[index] = dmg;

                result.bounces = this.rollBounces();

                if(roll >= result.attack.target) {  //if hit target, remove bounces
                    result.bounces = [];
                } else if('dynamite' !== id) {      //if miss non-dyn, blank damage
                    result.dmg[i] = '-';
                }

            };

            /**
             * reroll a damage value
             * @param {string} id - id of the attack containing the damage value
             * @param {integer} index - position of the damage value in the attack's array
             */
            this.rerollDmg = function(id, index) {
                var result = this.rollResults[id];
                var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
                if(result.attack.dmgMod)
                    dmg += result.attack.dmgMod;
                result.dmg[index] = dmg;
            };

            /**
             * parse variables out of attack for calculation
             */
            this.parseAttackStats = function(att) {
                
                var result = {
                    numAttDie: 1, attDie: 6, attMod: 0,
                    dmgDie: 6, dmgMod: 0, target: 4
                };

                if(typeof(att) === 'string' && 'dynamite' === att) {
                    result.target = this.character.ranged;
                    result.range = (this.character.stats.Strength + 3);
                    result.bounces = this.rollBounces();

                } else if(typeof(att) === 'string' && 'hatchet' === att) {
                    result.target = this.character.melee;
                    result.range = (this.character.stats.Strength + 3);
                    result.dmgMod = 2;

                } else {

                    result.target = this.character[att.type];

                    var match = /(\d)?[d](\d){1}([\+\-]\d+)?/i.exec(att.attack);
                    if(match && match.length>1) {
                        
                        result.numAttDie = match[1]*1;
                        result.attDie = match[2]*1;
                        result.attMod = match[3]*1;
                        result.target = this.character[att.type];
                        result.dmgDie = 6;

                        var m2 = /d(\d){1}([\+\-]\d+)?/i.exec(att.damage);
                        if(m2 && m2.length > 1) {
                            result.dmgDie = m2[1]*1;
                            result.dmgMod = m2[2]*1;
                        }
                    }
                }

                return result;
                    
            };

            /**
             * determine how many bounces and which directions for dynamite
             */
            this.rollBounces = function() {

                //generate bounces beforehand

                //roll d3 to determine # bounces
                var num = Math.ceil( Math.random() * 3 );

                var dir = [
                    'down-left', 'left', 'up-left', 'up', 'up-right', 'right', 'down-right', 'down'
                ];

                //for each bounce, roll d8 for direction
                var bounces = [];
                while(num>0) {
                    var bounce = Math.floor( Math.random() * 8 );
                    bounces.push(dir[bounce]);
                    num--;
                }
                return bounces;
            };

        }

    });


}) (angular);