import {
    Component, OnInit, OnChanges, Input, Output,
    SimpleChanges, EventEmitter
} from '@angular/core';

import { Reward } from '../models';
import { Contraption } from './contraption';
import { PartFactory, Part } from '../parts/part';
import { RewardsService } from '../reward.service';

@Component({
  selector: 'ateam-contraption',
  templateUrl: './contraption.component.html',
  styleUrls: ['./contraption.component.less']
})
export class ContraptionComponent implements OnInit, OnChanges {

    @Input() contraption : Contraption;
    @Input() round       : number;
    @Input() previewPart : Part;
    @Output() onEvent : EventEmitter<any> = new EventEmitter<any>();

    public removedPart : any;

    constructor( private rewards : RewardsService ) { }

    ngOnInit() {
    }

    ngOnChanges( changes: SimpleChanges ) {
        if(changes.round) {
            this.contraption.coolParts();
        }
        if(changes.previewPart) {
            let part = changes.previewPart.currentValue;
            if(part)
                this.determineAvailbleSpaces(part);
        }
    }

    onPartEvent( part : Part ) {
        this.rewards.add(part.reward);
    }

    addPart(index : number) {
        if(!this.previewPart) return;
        let spaces = this.contraption.spaces;
        if(!spaces[index].part && spaces[index].supports) {
            this.contraption.addPart(this.previewPart, index);
            this.previewPart = null;
            this.onEvent.emit("part:added");

            if(this.removedPart && this.removedPart.index === index) {
                this.removedPart = null;
            }
        }
    }

    remove( event : any, index: number ) {
        let spaces = this.contraption.spaces;
        if( spaces[index].part ) {
            this.removedPart = {index: index, part: spaces[index].part};
            spaces[index].part = null;

            if(this.previewPart) {
                this.determineAvailbleSpaces(this.previewPart);
            }
        }
        event.stopPropagation();
    }

    undoRemovePart() {
        let idx = this.removedPart.index;
        if(
            this.removedPart &&
            !this.contraption.spaces[idx].part
        ) {
            this.contraption.addPart(this.removedPart.part, idx);
            this.removedPart = null;

            if(this.previewPart) {
                this.determineAvailbleSpaces(this.previewPart);
            }
        }
    }

    determineAvailbleSpaces( part : Part ) {
        for(let i=0; i<25; ++i) {
            this.checkSpaceSupports(i, part);
        }
    }

    checkSpaceSupports(index : number,  part : Part ) {
        let modulus     = index % 5;
        let conn        = part.connectors;
        let spaces      = this.contraption.spaces;
        let space       = spaces[index];
        let leftSpace   = modulus === 0 ? null : spaces[index-1];
        let rightSpace  = modulus === 4 ? null : spaces[index+1];
        let topSpace    = index > 4 ? spaces[index-5] : null;
        let bottomSpace = index < 20 ? spaces[index+5] : null;

        if(space.frame || space.part) {
            space.supports = false;
            return;
        }

        if(
            (!leftSpace || !leftSpace.part) && (!rightSpace || !rightSpace.part) &&
            (!topSpace || !topSpace.part) && (!bottomSpace || !bottomSpace.part)
        ) {
            //no neighbors
            space.supports = false;
            return;
        }

        let m = 0;

        if(conn.top) {
            //top space must have bottom connector, or not have a part, or not exist (edge)
            if(topSpace && topSpace.part) {
                if(!topSpace.part.connectors.bottom) {
                    space.supports = false;
                    return;
                }
                m += 1;
            }
        } else if(topSpace && topSpace.part && topSpace.part.connectors.bottom) {
            space.supports = false;
            return;
        }

        if(conn.bottom) {
            //bottom space must have bottom connector, or not have a part, or not exist (edge)
            if(bottomSpace && bottomSpace.part) {
                if(!bottomSpace.part.connectors.top) {
                    space.supports = false;
                    return;
                }
                m += 1;
            }
        } else if(bottomSpace && bottomSpace.part && bottomSpace.part.connectors.top) {
            space.supports = false;
            return;
        }

        if(conn.left) {
            //left space must have bottom connector, or not have a part, or not exist (edge)
            if(leftSpace && leftSpace.part) {
                if(!leftSpace.part.connectors.right) {
                    space.supports = false;
                    return;
                }
                m += 1;
            }
        } else if(leftSpace && leftSpace.part && leftSpace.part.connectors.right) {
            space.supports = false;
            return;
        }

        if(conn.right) {
            //right space must have right connector, or not have a part, or not exist (edge)
            if(rightSpace && rightSpace.part) {
                if(!rightSpace.part.connectors.left) {
                    space.supports = false;
                    return;
                }
                m += 1;
            }
        } else if(rightSpace && rightSpace.part && rightSpace.part.connectors.left) {
            space.supports = false;
            return;
        }

        //at least one of the preview part's connectors must line up with an
        // existing part or else it cannot be added
        space.supports = (m > 0);

    }

}
