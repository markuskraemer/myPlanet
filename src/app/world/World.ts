import { MapGenerator } from './MapGenerator';
import { TileMap } from './TileMap';
import { Tile } from './Tile';
import { Creature } from './Creature';

export class World {

    private _creatures:Creature [] = [];
    public readonly width:number = 800;
    public readonly height:number = 600;
    private static _instance:World;
    private _tileMap:TileMap;
    private _id:string;
    
    public get id ():string {
        return this._id;
    }

    public get tileMap ():TileMap {
        return this._tileMap;
    }

    public get creatures ():Creature[]{
        return this._creatures;
    }

    constructor (id:string = undefined) {
        
        if(id == undefined){
            this._id = '' + new Date ().getTime ();
        }else{
            this._id = id; 
        }

        const map:number[][] = MapGenerator.create (this.width/TileMap.TILE_SIZE,this.height/TileMap.TILE_SIZE);
        
        this._tileMap = new TileMap ();
        this._tileMap.createTilesBySeedMap (map);
        const tile:Tile = new Tile ();
        tile.foodAmount = Tile.MAX_FOOD_AMOUNT;
        this._tileMap.tiles.push(tile);
    }

    public toJSON ():any {
        let { _creatures, _id, _tileMap } = this;
        return { _creatures, _id, _tileMap }; 
    }

    public static fromJSON (json:JSON):World {
        const world = new World (json['_id']);
        console.log("new World from JSON: ", json);
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
