import { MapGenerator } from './MapGenerator';
import { TileMap } from './TileMap';
import { Tile } from './Tile';
import { Creature } from './Creature';

export class World {

    private _creatures:Creature [] = [];
    public readonly width:number = 400;
    public readonly height:number = 400;
    private static _instance:World;
    private _tiles:Tile[] = [];
    private _tileMap:TileMap;

    public get tileMap ():TileMap {
        return this._tileMap;
    }

    public get tiles ():Tile []{
        return this._tiles;
    }

    public get creatures ():Creature[]{
        return this._creatures;
    }

    constructor () {

        const map:number[][] = MapGenerator.create (20,10);

        this._tileMap = new TileMap ();
        this._tileMap.createTilesBySeedMap (map);
        const tile:Tile = new Tile ();
        tile.foodAmount = Tile.MAX_FOOD_AMOUNT;
        this._tileMap.tiles.push(tile);
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

    public tick (delta:number):void {
        for(const creature of this._creatures){
            creature.tick (delta);
        }
    }
}
