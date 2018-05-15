import { MapGenerator } from './MapGenerator';
import { TileMap } from './TileMap';
import { Tile } from './Tile';
import { Creature } from './Creature';

export class World {

    private _creatures:Creature [] = [];
    public readonly width:number = 800;
    public readonly height:number = 400;
    private static _instance:World;
    private _tileMap:TileMap;
    private _id:string;
    public name:string;

    public get id ():string {
        return this._id;
    }

    public get tileMap ():TileMap {
        return this._tileMap;
    }

    public get creatures ():Creature[]{
        return this._creatures;
    }

    constructor (selfInit:boolean = true) {
        
        if(selfInit){
            this.name = "Untitled World";
            this._id = '' + new Date ().getTime ();
            const map:number[][] = MapGenerator.create (this.width/TileMap.TILE_SIZE,this.height/TileMap.TILE_SIZE);            
            this._tileMap = new TileMap ();
            this._tileMap.createTilesBySeedMap (map);
        }
    }

    public toJSON ():any {
        let { _creatures, _id, _tileMap, name } = this;
        return { _creatures, _id, _tileMap, name }; 
    }

    public static fromJSON (json:JSON):World {
        console.log("new World from JSON: ", json);
        const world = new World (false);
        world._id = json['_id'];
        world.name = json['name'];
        world._tileMap = TileMap.fromJSON (json['_tileMap']);      
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

    public tick (delta:number):void {
        for(const creature of this._creatures){
            creature.tick (delta);
        }
    }
}
