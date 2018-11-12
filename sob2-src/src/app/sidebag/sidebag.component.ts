import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sidebag',
    templateUrl: './sidebag.component.html',
    styleUrls: ['./sidebag.component.less']
})
export class SidebagComponent implements OnInit {

    @Input() sidebag : any;
    @Input() modifiers: { value:number, sources: string[] };
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();


    public carrying : number = 0;
    private max : number = 0;

    public options : {label:string; description:string}[] = [
        {label:"bandages",  description: "discard to heal D6 wounds from yourself or adjacent hero"},
        {label:"whiskey",   description: "discard to heal D6 sanity from yourself or adjacent hero"},
        {label:"tonic",     description: "discard to gain 1 grit"},
        {label:"herbs",     description: "discard to heal 2D6 wounds from yourself or adjacent hero"},
        {label:"dynamite",  description: "ranged attack; range: strength +3, does D6 wounds ignoring defense to each model in same and adjacent spaces"},
        {label:"flash",     description: "discard to make all enemies -2 initiative until the end of the turn"},
        {label:"fungus",    description: "discard to heal D6 wounds and D6 sanity from yourself or adjacent hero"},
        {label:"spices",    description: "discard to add D3 damage to one hit and gain 1 wound ignoring defense"},
        {label:"potions",   description: "discard to add +2 to one of your skills until end of the turn"},
        {label:"hatchets",  description: "free ranged attack; range strength +3, shots 1, +2 damage. uses melee to hit"},
        {label:"lanternOil", description: "discard to re-roll one of the hold back the darkness dice"},
        {label:"exoticHerbs",  description: "discard to remove D3 corruption points"},
        {label:"tequila",   description: "discard to heal 2D6 sanity from yourself or adjacent hero"},
        {label:"cigars",    description: "discard to gain armor 3+ until the end of the turn"},
        {label:"shatterGrenade", description: "discard to throw like Dynamite. Any model hit takes D3 Wounds ignoring Defense and gains a Stunned token (-1 Defense). At the start of activation, remove 1 Stunned marker on a roll of 4+."},
        {label:"antiRad",   description: "discard to remove D6 Corruption Points" },
        {label:"junkBomb",  description: "(free attack) discard to Throw and Bounce like Dynamite. All models in the same and adjacent spaces take 2D6-5 Wounds, ignoring Defense" },
        {label:"fireSake",  description: "discard to gain D3 Fury tokens" },
        {label:"nectar",    description: "discard to Recover D3 Grit"},
        {label:"stake",     description: "(free attack) discard for Combat 1. Critical Hit on 5 or 6. +1 Damage vs Beast or Undead Enemy or +2 Damage vs Vampire Enemy" }
    ];

    constructor() { }

    ngOnInit() {
        this.max = this.getAvailableSidebagCapacity();
    }

    save () {
        this.onSave.emit({type:"sidebag"});
        this.max = this.getAvailableSidebagCapacity();
    }

    getAvailableSidebagCapacity() {
        if(!this.sidebag) return 0;

        var carrying = 0;
        for(var i=0; i<this.options.length; ++i) {
            var option = this.options[i];
            carrying += this.sidebag[option.label] || 0;
        }

        this.carrying = carrying;
        let remaining = this.sidebag.capacity - carrying;

        if(this.modifiers) {
            //adjust for modified carrying capacity
            remaining += (this.modifiers.value || 0);
        }

    }

    updateCapacity($event) {
        this.save();
    }

    increase(option) {
        if(this.getAvailableSidebagCapacity() < 1) return;

        var value = this.sidebag[option] || 0;
        value += 1;
        this.sidebag[option] = value;
        this.save();
    }

    decrease(option) {
        var value = this.sidebag[option] || 0;
        if(value > 0) {
            value -= 1;
            this.sidebag[option] = value;
            this.save();
        }
    }


}
