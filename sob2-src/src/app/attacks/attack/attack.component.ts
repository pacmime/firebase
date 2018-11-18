import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { SOBCharacter, Attack, AttackType, AttackRoll, AttackDetails } from '../../models/character.model';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.less']
})
export class AttackComponent implements OnInit {

    @Input() attack : Attack;
    @Output() onEvent = new EventEmitter<{ name:string, value:any }>();

    private details : AttackDetails;

    private roll : AttackRoll;

    private confirmingDelete: boolean = false;
    public isEditing: boolean = false;
    private editable: Attack = null;

    private charSub : ISubscription;
    private character : SOBCharacter;


    constructor(private service:FirestoreService) { }

    ngOnInit() {

        this.charSub = this.service.getCharacter( character => {
            this.character = character;
        });
    }

    ngOnDestroy() {
        this.charSub.unsubscribe();
        this.charSub = null;
        this.character = null;
        this.service = null;
        this.details = null;
        this.roll = null;
        this.attack = null;
        this.onEvent = null;
        this.editable = null;
    }

    edit () {
        //make a copy so we don't overwrite changes before saving
        this.editable = {
            attack:"",
            damage:"",
            description:"",
            name:"",
            toHit:"",
            type:'melee',
            range: ""
        };
        Object.assign(this.editable, this.attack);
        this.isEditing = true;
    }
    cancelEditing () {
        this.isEditing = false;
        this.editable = null;
    }
    saveEdits () {
        //overwrite with changes
        Object.assign(this.attack, this.editable);
        this.isEditing = false;
        this.onEvent.emit({name: 'update', value: this.attack});
    }

    remove () {
        this.onEvent.emit({name: 'remove', value: this.attack});
    }


    /**
     * @param {string} id - id of the attack to roll
     */
    execute() {

        let result : AttackRoll = { attack: null, hits: [], dmg: [], bounces: [] };

        if(!this.details) {
            this.details = this.parseAttackStats(this.attack, result);
        }

        // if('dynamite' === id) {
        //     result.attack = this.parseAttackStats(id);
        //     result.bounces = this.rollBounces();
        // } else if('hatchet' === id) {
        //     result.attack = this.parseAttackStats(id);
        // } else {
        //     var combat = this.attack;
        //     if(combat.attack && combat.type && combat.damage) {
        //         result.attack = this.parseAttackStats(combat);
        //     }
        // }

        var i=0, hits = 0;
        while( i < this.details.numAttDie) {

            //roll to-hit
            var roll = Math.ceil( Math.random() * this.details.attDie );
            if(this.details.attMod)
                roll += this.details.attMod;
            result.hits[i] = roll;

            //roll damage
            var dmg = Math.ceil( Math.random() * this.details.dmgDie );
            if(this.details.dmgMod)
                dmg += this.details.dmgMod;
            result.dmg[i] = dmg*1;
            if(result.hits[i] < this.details.target) {
                result.dmg[i] = '(' + result.dmg[i] + ')'
            }

            if(roll >= this.details.target) {  //if hit target, remove bounces
                result.bounces = [];
            }
            //  else if('dynamite' !== id) {      //if miss non-dyn, blank damage
            //     result.dmg[i] = '-';
            // }

            i++;
        }

        this.roll = result;
    }

    /**
     * reroll a to-hit value
     * @param {string} id - id of the attack containing the to-hit value
     * @param {integer} index - position of the to-hit value in the attack's array
     */
    rerollHit (id, index) {
        // var result = this.rollResults[id];
        // var roll = Math.ceil( Math.random() * result.attack.attDie );
        // if(result.attack.attMod)
        //     roll += result.attack.attMod;
        // result.hits[index] = roll;
        //
        // var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
        // if(result.attack.dmgMod)
        //     dmg += result.attack.dmgMod;
        // result.dmg[index] = dmg;
        //
        // result.bounces = this.rollBounces();
        //
        // if(roll >= result.attack.target) {  //if hit target, remove bounces
        //     result.bounces = [];
        // } else if('dynamite' !== id) {      //if miss non-dyn, blank damage
        //     result.dmg[i] = '-';
        // }

    }

    /**
     * reroll a damage value
     * @param {string} id - id of the attack containing the damage value
     * @param {integer} index - position of the damage value in the attack's array
     */
    rerollDmg(id, index) {
        // var result = this.rollResults[id];
        // var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
        // if(result.attack.dmgMod)
        //     dmg += result.attack.dmgMod;
        // result.dmg[index] = dmg;
    }

    /**
     * parse variables out of attack for calculation
     */
    parseAttackStats(att:Attack, roll:AttackRoll) : AttackDetails {

        var result : AttackDetails = {
            numAttDie: 1, attDie: 6, attMod: 0,
            dmgDie: 6, dmgMod: 0, target: 4, range: 0
        };

        let character = this.character;

        if(typeof(att) === 'string' && 'dynamite' === att) {
            result.target = character.ranged;
            result.range = (character.stats.Strength + 3);
            roll.bounces = this.rollBounces();

        } else if(typeof(att) === 'string' && 'hatchet' === att) {
            result.target = character.melee;
            result.range = (character.stats.Strength + 3);
            result.dmgMod = 2;

        } else {

            result.target = character[att.type];

            var match = /(\d)?[d](\d){1}([\+\-]\d+)?/i.exec(att.attack);
            if(match && match.length>1) {

                let g1:number = parseInt(match[1]);
                let g2:number = parseInt(match[2]);
                let g3:number = parseInt(match[3])||0;
                result.numAttDie = g1;
                result.attDie = g2;
                result.attMod = g3;
                result.dmgDie = 6;

                var m2 = /d(\d){1}([\+\-]\d+)?/i.exec(att.damage);
                if(m2 && m2.length > 1) {
                    let mg1:number = parseInt(m2[1]);
                    let mg2:number = parseInt(m2[2])||0;
                    result.dmgDie = mg1;
                    result.dmgMod = mg2;
                }
            }
            // console.log(match);
            // console.log(result);
        }

        return result;

    }

    /**
     * determine how many bounces and which directions for dynamite
     */
    rollBounces() {

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
    }
}
