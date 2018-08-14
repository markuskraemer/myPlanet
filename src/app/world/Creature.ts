
import { TileType } from './TileType.enum';
import { MathUtils } from './../utils/MathUtils';
import { ObjectUtils } from './../utils/ObjectUtils';
import { Tile } from './Tile';
import { Alias } from './../Alias';
import { World } from './World';
import { CreatureNeuronIds } from './CreatureNeuronIds';
import { WorkingNeuron } from './../network/WorkingNeuron';
import { NeuralNetwork } from './../network/NeuralNetwork';
import { InputNeuron } from './../network/InputNeuron';
import { nonenumerable } from './../utils/ObjectUtils';
import * as Color from 'color';


export class Creature {

    private static readonly EAT_GAIN:number = 10;
    private static readonly ROTATE_FACTOR:number = .25;
    private static readonly MOVE_FACTOR:number = 5;
    
    private static readonly COST_ROTATE:number = 8;
    private static readonly COST_MOVE:number = 1;
    private static readonly COST_PERMANENT:number = 1;
    private static readonly COST_EAT:number = .1;

    private static readonly START_ENERGY:number = 150;
    private static readonly MINIMUM_SURVIVALENERGY:number = 100;
    private static readonly MINIMUM_AGE_TO_GIVE_BIRTH:number = 2;


    private static creatureCount:number = 0;
    private _brain:NeuralNetwork;
    private tile:Tile;
    private moveVector:{x:number, y:number};
    private _energy:number = 0;
    private _recordHistory:boolean = false;

    public inputFood:InputNeuron;
    public inputEnergy:InputNeuron;
    public inputAge:InputNeuron;
    
    public outEat:WorkingNeuron;
    public outRotate:WorkingNeuron;
    public outMove:WorkingNeuron;
    public outGiveBirth:WorkingNeuron;
    
    public id:string;
    public name:string = 'any creature';
    public x:number;
    public y:number;
    public width:number = 10;
    public height:number = 10;
    public viewAngle:number = 0;
    public age:number = 0;
    public color:Color;
    public generation:number = 0;
    public isDead:boolean = false;

    public __history:JSON[];

    public childCount:number = 0;

    public get energy ():number {
        return this._energy;
    }

    public get brain ():NeuralNetwork {
        return this._brain;
    }

    public set recordHistory (value:boolean) {

        if(this._recordHistory != value) {
            this._recordHistory = value;
        }
    }

    public get recordHistory ():boolean{
        return this._recordHistory;
    }

    constructor (doSelfInit:boolean = true)  {
       // console.log(" new Creature: ", doSelfInit);
       Object.defineProperty(this, '__history', {
            value: [],
            writable: true,
            enumerable:false
        });
        this.moveVector = {x:0, y:0};
      
        if(doSelfInit){
            this.init ();
        }    
    }

    public static createByDesign ():Creature {
        const creature:Creature = new Creature();
        
        creature.outEat.connections[0].weight = 10;
        creature.outEat.connections[1].weight = 1;
        creature.outEat.connections[2].weight = 0;

        creature.outRotate.connections[0].weight = 0;
        creature.outRotate.connections[1].weight = 0;
        creature.outRotate.connections[1].weight = 0;

        creature.outMove.connections[0].weight = 0;
        creature.outMove.connections[1].weight = 0;
        creature.outMove.connections[2].weight = 1;

        creature.outGiveBirth.connections[0].weight = 1;
        creature.outGiveBirth.connections[1].weight = 1;
        creature.outGiveBirth.connections[2].weight = 0.2;

        creature.color = new Color (0xccffcc);

        return creature;
    }


    public static fromJSON (json:JSON):Creature {
        const creature:Creature = new Creature(false);
        creature.initFromJSON(json);
        return creature;
    }

    public static fromCreature (mother:Creature):Creature {
        const creature:Creature = new Creature(false);
        creature.initFromCreature(mother);
        return creature;
    }

    public static createFromJSONBrain (json:JSON):Creature {
        const creature:Creature = new Creature(false);
        creature._energy = Creature.START_ENERGY;
        creature.createBrainFromJSON(json);
        return creature;
    }

    private init ():void{
        this.generation = 0;
        this.id = '' + Creature.creatureCount ++;
        this._energy = Creature.START_ENERGY;
        this.color = this.getRandomColor ();
        this.createBrain ();
        this.initBrain ();
        this._brain.generateMesh (); 
        this._brain.setConnectionTargets (); 
        this._brain.randomizeWeights ();
    }

    private initFromJSON (json:JSON):void {
        this.id = json['id'];
        this.name = json['name'];
        this.x = json['x'];
        this.y = json['y'];
        this.color = new Color(json['color'].color);
        this.viewAngle = json['viewAngle'];
        this.moveVector = {x: json['moveVector'].x, y: json['moveVector'].y};
        this.age = json['age'];
        this.isDead = json['isDead'];

        this.createBrainFromJSON (json);

        this._energy = json['_energy'];
        this._recordHistory = false;
    }

    private createBrainFromJSON (json:any):void {

        this._brain = new NeuralNetwork ();

        this.inputFood = InputNeuron.fromJSON (json['inputFood']);
        this.inputEnergy = InputNeuron.fromJSON (json['inputEnergy']);
        this.inputAge = InputNeuron.fromJSON (json['inputAge']);
        this.outEat = WorkingNeuron.fromJSON (json['outEat']);
        this.outRotate = WorkingNeuron.fromJSON (json['outRotate']);
        this.outMove = WorkingNeuron.fromJSON (json['outMove']);
        this.outGiveBirth = WorkingNeuron.fromJSON (json['outGiveBirth']);

        this.color = new Color(json['color'].color);
        this.initBrain ();
        this._brain.setConnectionTargets (); 
    }

    private initFromCreature (creature:Creature):void {
        this.initFromJSON(creature.toJSON());
        this.id = '' + Creature.creatureCount ++;
        this.viewAngle = Math.random () * Math.PI * 2;
        this._energy = Creature.START_ENERGY;
        this.age = 0;
        this.generation = creature.generation + 1;
        this.calcNewColorBySeed ();
        this.randomize ();
    }


    public calcNewColorBySeed ():void {
        this.color =  new Color ([
            this.getRandomBySeed (this.color.red ()),
            this.getRandomBySeed (this.color.green ()),
            this.getRandomBySeed (this.color.blue ()),
        ]);
    }

    private getRandomBySeed (seed:number):number {
        if(seed < 10)
            seed = 10;
        if(seed > 245)
            seed = 245;
        return seed + Math.floor(20 * Math.random ()) - 10;
    }

    private randomize ():void {
        this.brain.randomizeAnyConnection (.2);
    }

    public toJSON ():any {
        return ObjectUtils.deepCopy (this);
    }

    private getRandomColor ():Color {
        const r:number = Math.random () * 255;
        const g:number = Math.random () * 255;
        const b:number = Math.random () * 255;

        return Color.rgb (r, g, b);
    }

    private createBrain ():void {
        this._brain = new NeuralNetwork ();

        this.inputFood = new InputNeuron (CreatureNeuronIds.IN_FOOD);
        this.inputEnergy = new InputNeuron (CreatureNeuronIds.IN_ENERGY);
        this.inputAge = new InputNeuron (CreatureNeuronIds.IN_AGE);
       
        this.outEat = new WorkingNeuron (CreatureNeuronIds.OUT_EAT);
        this.outRotate = new WorkingNeuron (CreatureNeuronIds.OUT_ROTATE);
        this.outMove = new WorkingNeuron (CreatureNeuronIds.OUT_MOVE);
        this.outGiveBirth = new WorkingNeuron (CreatureNeuronIds.OUT_GIVE_BIRTH);

    }

    private initBrain ():void {
        this._brain.addInputNeuron (this.inputFood); 
        this._brain.addInputNeuron (this.inputEnergy); 
        this._brain.addInputNeuron (this.inputAge); 

        this._brain.addOutputNeuron (this.outEat);
        this._brain.addOutputNeuron (this.outRotate);
        this._brain.addOutputNeuron (this.outMove);
        this._brain.addOutputNeuron (this.outGiveBirth);
    }

    public tick (timeDelta:number):void {

        if(this.isDead)
            return;
    
        if(this._recordHistory)
            this.__history.push(this.toJSON());
      
        this.tile = Alias.world.tileMap.getTileAtXY (this.x, this.y);
        this.updateInputNeurons ();
        const costMultiplier:number = this.calcCostMultiplier ();
        this.rotate (costMultiplier, timeDelta);
        this.moveVector.x = Math.sin(this.viewAngle);
        this.moveVector.y = Math.cos(this.viewAngle);
        this.move (costMultiplier, timeDelta);
        this.eat (costMultiplier, timeDelta);
        this.checkGiveBirth ();
        this._energy -= Creature.COST_PERMANENT * costMultiplier;
        this.age += .1 * timeDelta;
        this.checkDie ();
    }

    private updateInputNeurons ():void {
        this.inputFood.input = this.tile ? this.tile.foodAmount / Alias.world.maxTileFoodAmount : 0;
        this.inputEnergy.input = (this._energy - Creature.MINIMUM_SURVIVALENERGY) / (Creature.START_ENERGY - Creature.MINIMUM_SURVIVALENERGY);
        this.inputAge.input = this.age / 10;
    }    


    private calcCostMultiplier ():number {
        
        if(this.tile == null || this.tile.type == TileType.Water)
            return 2 * this.age;
        else
            return 1 * this.age;
    }

    private isAbleToGiveBirth() {
        return this._energy > Creature.START_ENERGY + Creature.MINIMUM_SURVIVALENERGY * 1.1 && this.age > Creature.MINIMUM_AGE_TO_GIVE_BIRTH;
    }

    private eat (costMultiplier:number, timeDelta:number):void {
        if(this.tile){
            const eatWish:number = MathUtils.clamp01 (this.outEat.output);
            const wantsToEat:number = eatWish * Creature.EAT_GAIN * timeDelta; 
            const actualFoodAmount:number = this.tile.eat (wantsToEat);
            this._energy += actualFoodAmount;
        }
    }

    private rotate (costMultiplier:number, timeDelta:number):void {
        const rotateForce = MathUtils.clampNegPos(this.outRotate.output);
        this.viewAngle += rotateForce * Creature.ROTATE_FACTOR * timeDelta;
        this._energy -= Math.abs(rotateForce * Creature.COST_ROTATE * timeDelta * costMultiplier);
    }

    private move (costMultiplier:number, timeDelta:number):void {
        const moveForce = MathUtils.clampNegPos(this.outMove.output);
        this.moveVector.x *= (moveForce * Creature.MOVE_FACTOR);
        this.moveVector.y *= (moveForce * Creature.MOVE_FACTOR);
        if(Alias.world.tileMap.isOnTile (this.x + this.moveVector.x, this.y + this.moveVector.y)){
            this.x += this.moveVector.x;
            this.y += this.moveVector.y;
        }else{
            this.viewAngle += Math.PI;
        }
        this._energy -= Math.abs(moveForce * Creature.COST_MOVE * timeDelta * costMultiplier);
    }

    private checkGiveBirth ():void {
        if(this.outGiveBirth.output > 0 && this.isAbleToGiveBirth ()){
            this.giveBirth ();
        }
    }

    private giveBirth ():void {
        const child:Creature = Creature.fromCreature (this);
        Alias.world.addCreature(child);
        this._energy -= 150;
        this.childCount ++;
    }

    private checkDie ():void {
        if(this._energy < Creature.MINIMUM_SURVIVALENERGY){
            Alias.world.letCreatureDie (this);
        }
    }

}
