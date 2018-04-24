import { Creature } from './Creature';
export class World {

    private creatures:Creature [] = [];

    constructor () {

    }

    public addCreateture ():void {
        const createure:Creature = new Creature ();
        this.creatures.push(createure);
    }
}
