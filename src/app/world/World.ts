import { MapGenerator } from './MapGenerator';
import { TileMap } from './TileMap';
import { Tile } from './Tile';
import { Creature } from './Creature';

export class World {

    private _creatures:Creature [] = [];
    public readonly width:number = 800;
    public readonly height:number = 800;
    public minCreatureCount:number = 10;
    public readonly MAX_CREATURE_COUNT:number = 1000;
    private static _instance:World;
    private _tileMap:TileMap;
    private _id:string;
    public name:string;
    public totalCreaturesCount:number = 0;
    public deadCreaturesCount:number = 0;
    public totalAgeOfDeadCreatures:number = 0;
    public oldestAliveCreature:Creature;
    public inspectRandomCreature:boolean = true;


    private _inspectedCreature:Creature;
    public set inspectedCreature(creature:Creature) {
        this._inspectedCreature = creature;
        this._inspectedCreature.recordHistory = true;
    }

    public get inspectedCreature ():Creature {
        return this._inspectedCreature;
    }

    public get oldestAliveCreatureAge ():number {
        return this.oldestAliveCreature ? this.oldestAliveCreature.age : 0;
    }


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

    public get avAgeOfDeadCreatures ():number {
        return this.totalAgeOfDeadCreatures / this.deadCreaturesCount;
    }

    constructor (selfInit:boolean = true) {
        
        if(selfInit){
            this.name = "Untitled World";
            this._id = '' + Math.floor(Math.random () * 1000);
            const map:number[][] = MapGenerator.create (this.width/TileMap.TILE_SIZE,this.height/TileMap.TILE_SIZE);            
            this._tileMap = new TileMap ();
            this._tileMap.createTilesBySeedMap (map);

            let cnt:number = 10;
            while(--cnt){
                const creatureByDesign:Creature = Creature.createByDesign ();
                this.setAtRandomPosition(creatureByDesign);
                this.addCreature(creatureByDesign);
            }
        }
    }

    public toJSON ():any {
        return this;
    }

    public static fromJSON (json:JSON):World {
        const world = new World (false);
        world._id = json['_id'];
        world.name = json['name'];
       // world.totalCreaturesCount = json['totalCreaturesCount'];
        world.deadCreaturesCount = json['deadCreaturesCount'];
        world.totalAgeOfDeadCreatures = json['totalAgeOfDeadCreatures'];
        world._tileMap = TileMap.fromJSON (json['_tileMap']);      
        for(const creaturesJSON of json['_creatures']){
            let creature:Creature = Creature.fromJSON(<any>creaturesJSON);
            world.addCreature(creature);
        }
        return world;
    }

    public letCreatureDie (creature:Creature):void {
        this.deadCreaturesCount ++;
        this.totalAgeOfDeadCreatures += creature.age;        
        const index:number = this._creatures.indexOf (creature);
        this._creatures.splice(index, 1);
        if(creature == this.oldestAliveCreature){
            this.oldestAliveCreature = null;
        }

        if(creature == this._inspectedCreature){
            
        }
        
    }

    public createCreature ():void {
        const creature:Creature = new Creature ();
        this.setAtRandomPosition (creature);
        this.addCreature(creature);
    }

    public setAtRandomPosition (creature:Creature):void {
        creature.x = Math.random () * this.width;
        creature.y = Math.random () * this.height;
    }

    public addCreature (creature:Creature):void {
        if(this.aliveCreaturesCount < this.MAX_CREATURE_COUNT){
            this.totalCreaturesCount ++;
            this._creatures.push(creature);
            if(this.inspectRandomCreature && this.inspectedCreature != null && this.inspectedCreature.isDead){
                this.inspectedCreature = creature;
            }
        }
    }

    public setCreatureCountTo (n:number):void {
        while(this._creatures.length > n){
            this._creatures.pop ();
            this.deadCreaturesCount ++;
        }

        while(this.aliveCreaturesCount < n){
            this.createCreature ();
        }

        this.tick (1);
    }

    public tick (delta:number):void {
        this.tileMap.tick ();

        for(const creature of this._creatures){
             if(this.oldestAliveCreature == null || creature.age > this.oldestAliveCreature.age) {
                this.oldestAliveCreature = creature;
                if(this.inspectRandomCreature || this.inspectedCreature == null){
                    this.inspectedCreature = creature;
                }
            }
            creature.tick (delta);
        }

        this.createCreaturesToMinCreatureCount ();
    }

    private createCreaturesToMinCreatureCount ():void {
        while (this.aliveCreaturesCount < this.minCreatureCount){
            this.createCreature ();
        }
    }
}
