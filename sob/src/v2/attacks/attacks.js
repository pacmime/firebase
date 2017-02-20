(function(angular) {
    
    "use strict";


    angular.module("sob-character").component('attacks', {

        bindings: {
            character: "=",
            onSave: '&'
        },
            
        templateUrl: 'src/v2/attacks/attacks.html',
            
        controller: function($scope, $element) {

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

            this.attExpr = /(\d)?[d](\d){1}/i;

            this.roll = function(id) {
                var combat = this.character.attacks[id];
                if(combat.attack && combat.type && combat.damage) {

                    var att = this.parseAttackStats(combat);
                    var result = {
                        attack: att,
                        hits: [],
                        dmg: []
                    };

                    var i=0, hits = 0;
                    while(i<att.numAttDie) {
                        var roll = Math.ceil( Math.random() * att.attDie );
                        result.hits[i] = roll;
                        if(roll >= att.target) {
                            var dmg = Math.ceil( Math.random() * att.dmgDie );
                            if(att.dmgMod)
                                dmg += att.dmgMod;
                            result.dmg[i] = dmg*1;
                        } else 
                            result.dmg[i] = '-';
                        i++;
                    }

                    this.rollResults = this.rollResults || {};
                    this.rollResults[id] = result;
                }
            };


            this.rerollHit = function(id, index) {
                var result = this.rollResults[id];
                var roll = Math.ceil( Math.random() * result.attack.attDie );
                result.hits[index] = roll;

                if(roll >= result.attack.target) {
                    var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
                    if(result.attack.dmgMod)
                        dmg += result.attack.dmgMod;
                    result.dmg[index] = dmg;
                } else 
                    result.dmg[index] = '-';

            };

            this.rerollDmg = function(id, index) {
                var result = this.rollResults[id];
                var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
                if(result.attack.dmgMod)
                    dmg += result.attack.dmgMod;
                result.dmg[index] = dmg;
            };


            this.parseAttackStats = function(att) {
                
                var result = {
                    numAttDie: 1,
                    attDie: 6,
                    dmgDie: 6,
                    dmgMod: 0,
                    target: this.character[att.type]
                };

                var match = /(\d)?[d](\d){1}/i.exec(att.attack);
                if(match && match.length>1) {
                    
                    result.numAttDie = match[1]*1;
                    result.attDie = match[2]*1;
                    result.target = this.character[att.type];
                    result.dmgDie = 6;

                    var m2 = /d(\d){1}([\+\-]\d+)?/i.exec(att.damage);
                    if(m2 && m2.length > 1) {
                        result.dmgDie = m2[1]*1;
                        result.dmgMod = m2[2]*1;
                    }
                }

                return result;
                    
            }

        }

    });


}) (angular);