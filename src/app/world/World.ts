import { Creature } from './Creature';

export class World {

    private creatures:Creature [] = [];

    constructor () {

    }

    public toJSON ():any {
        let { creatures } = this;
        return { creatures }; 
    }

    public static fromJSON (json:JSON):World {
        const world = new World ();
        for(const creaturesJSON of json['creatures']){
            world.addCreature(Creature.fromJSON(<any>creaturesJSON));
        }
        return world;
    }

    public createCreature ():void{
        const creature:Creature = new Creature ();
        this.addCreature(creature);
    }

    public addCreature (creature:Creature):void {
        this.creatures.push(creature);
    }
}
