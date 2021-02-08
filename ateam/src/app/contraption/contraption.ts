
import { Part, Frame } from '../parts/part';

interface Space {
    frame    ?: boolean;
    part      : Part;
    supports ?: boolean;
}

export class Contraption {

    private _spaces : Space[] = [] as Space[];

    constructor() {
        for(let i=0; i<25; ++i) {
            this._spaces[i] = {
                part : (i===12) ? new Frame() : null,
                frame : (i===12)
            };
        }
    }

    public get spaces() : Space[] { return this._spaces; }

    addPart( part : Part, idx : number ) {
        this._spaces[ idx ] = { part : part };
        this.checkNeighbors(part, idx);
    }

    coolParts() {
        this._spaces.forEach( space => {
            if(space.part) {
                space.part.coolDie();
            }
        })
    }

    checkNeighbors(part : Part, index : number) {

        let conn        = part.connectors;
        let modulus     = index % 5;
        let spaces      = this._spaces;
        let leftSpace   = modulus === 0 ? null : spaces[index-1];
        let rightSpace  = modulus === 4 ? null : spaces[index+1];
        let topSpace    = index > 4 ? spaces[index-5] : null;
        let bottomSpace = index < 20 ? spaces[index+5] : null;

        if(conn.top && topSpace && topSpace.part) {
            conn.topSet = true;
            topSpace.part.connectors.bottomSet = true;
        }

        if(conn.bottom && bottomSpace && bottomSpace.part) {
            conn.bottomSet = true;
            bottomSpace.part.connectors.topSet = true;
        }

        if(conn.left && leftSpace && leftSpace.part) {
            conn.leftSet = true;
            leftSpace.part.connectors.rightSet = true;
        }

        if(conn.right && rightSpace && rightSpace.part) {
            conn.rightSet = true;
            rightSpace.part.connectors.leftSet = true;
        }

    }

}
