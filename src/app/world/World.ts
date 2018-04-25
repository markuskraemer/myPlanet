import { Tile } from './Tile';
import { Creature } from './Creature';

export class World {

    private _creatures:Creature [] = [];
    public readonly width:number = 400;
    public readonly height:number = 400;
    private static _instance:World;
    
    public get creatures ():Creature[]{
        return this._creatures;
    }

    constructor () {

    }

    public toJSON ():any {
        let { _creatures } = this;
        return { _creatures }; 
    }

    public static fromJSON (json:JSON):World {
        const world = new World ();
        for(const creaturesJSON of json['_creatures']){
            world.addCreature(Creature.fromJSON(<any>creaturesJSON));
        }
        return world;
    }

    public createCreature ():void{
        const creature:Creature = new Creature ();
        creature.x = Math.random () * this.width;
        creature.y = Math.random () * this.height;
        this.addCreature(creature);
    }

    public addCreature (creature:Creature):void {
        this._creatures.push(creature);
    }

    public getTileAt (x:number, y:number):Tile{
        const tile:Tile = new Tile ();
        tile.foodAmount = 1;
        return tile;
    }

    public tick (delta:number):void {
        for(const creature of this._creatures){
            creature.tick (delta);
        }
    }
}
