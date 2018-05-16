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
    public totalCreaturesCount:number = 0;
    public deadCreaturesCount:number = 0;
    public totalAgeOfDeadCreatures:number = 0;

    public get id ():string {
        return this._id;
    }

    public get tileMap ():TileMap {
        return this._tileMap;
    }

    public get creatures ():Creature[] {
        return this._creatures;
    }

    public get aliveCreaturesCount ():number {
        return this.totalCreaturesCount - this.deadCreaturesCount;
    }

    public get avAgeOfDeadCreaturs ():number {
        return this.totalAgeOfDeadCreatures / this.deadCreaturesCount;
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
        return this;
        /*
        let { _creatures, _id, _tileMap, name } = this;
        return { _creatures, _id, _tileMap, name }; 
        */
    }

    public static fromJSON (json:JSON):World {
        const world = new World (false);
        world._id = json['_id'];
        world.name = json['name'];
        world.totalCreaturesCount = json['totalCreaturesCount'];
        world.deadCreaturesCount = json['deadCreaturesCount'];
        world.totalAgeOfDeadCreatures = json['totalAgeOfDeadCreatures'];
        world._tileMap = TileMap.fromJSON (json['_tileMap']);      
        for(const creaturesJSON of json['_creatures']){
            let creature:Creature = Creature.fromJSON(<any>creaturesJSON);
            creature.world = world;
            world.addCreature(creature);
        }
        return world;
    }

    public letCreatureDie (creature:Creature):void {
        this.deadCreaturesCount ++;
        this.totalAgeOfDeadCreatures += creature.age;        
        const index:number = this._creatures.indexOf (creature);
        this._creatures.splice(index, 1);
    }

    public createCreature ():void{
        this.totalCreaturesCount ++;
        const creature:Creature = new Creature ();
        creature.world = this;
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
