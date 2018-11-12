import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'mim',
  templateUrl: './mim.component.html',
  styleUrls: ['./mim.component.less']
})
export class MimComponent implements OnInit {

    @Input() current: any[];
    public mutations: any[];
    public injuries: any[];
    public madness: any[];
    @Output() onSave : EventEmitter<any> = new EventEmitter<any>();


    public showAvailable = {
        mutations : false,
        injuries  : false,
        madness   : false
    };
    public available = {
        mutations : [],
        injuries : [],
        madness : []
    };
    public newMutation: any = null;
    public newInjury: any = null;
    public newMadness: any = null;

    constructor(private afs : FirestoreService) { }

    ngOnInit() {

        this.mutations = this.current.filter(m => m.group.toLowerCase() == 'mutations');
        this.injuries = this.current.filter(m => m.group.toLowerCase() == 'injuries');
        this.madness = this.current.filter(m => m.group.toLowerCase() == 'madness');

        this.updateAvailable('mutations');
        this.updateAvailable('injuries');
        this.updateAvailable('madness');
    }

    add(type, value) {
        if(!this[type]) this[type] = [];
        this.showAvailable[type] = false;
        this[type].push(value);
        this.current.push(value);
        this.updateAvailable(type);
        this.onSave.emit({type:"mutation.added",value:value});
    }

    remove(type, index) {
        let rem = this[type].splice(index, 1);
        this.current.forEach((mim,idx) => {
            if(mim.group === type && mim.name === rem.name)
                index = idx;
        });
        if(index>=0) this.current.splice(index, 1);
        this.updateAvailable(type);
        this.onSave.emit({type:"mutation.removed",value:rem});
    }

    updateAvailable (type) {
        let takenNames = this[type].map(a=>a.name);

        let promise : Promise<any[]> = null;
        if('mutations' === type) promise = this.afs.getMutations();
        else if('injuries' === type) promise = this.afs.getInjuries();
        else if('madness' === type) promise = this.afs.getMadness();
        else return;

        promise.then( results => {
            this.available[type] = results.filter( a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name)<0;
            });
        });
    }
}
