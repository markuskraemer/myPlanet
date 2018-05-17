import * as Victor  from 'victor';

import { TileType } from './TileType.enum';
import { MathUtils } from './../utils/MathUtils';
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

    private static readonly EAT_GAIN:number = 50;
    private static readonly ROTATE_FACTOR:number = 1;
    private static readonly MOVE_FACTOR:number = 5;
    
    private static readonly COST_ROTATE:number = 5;
    private static readonly COST_MOVE:number = 1;
    private static readonly COST_PERMANENT:number = 1;
    private static readonly COST_EAT:number = .1;

    private static readonly START_ENERGY:number = 150;
    private static readonly MINIMUM_SURVIVALENERGY:number = 100;
    private static readonly MINIMUM_AGE_TO_GIVE_BIRTH:number = 2;


    private static creatureCount:number = 0;
    public id:number;
    private _brain:NeuralNetwork;

    public inputFood:InputNeuron;
    public inputEnergy:InputNeuron;
    public inputAge:InputNeuron;
    
    public outEat:WorkingNeuron;
    public outRotate:WorkingNeuron;
    public outMove:WorkingNeuron;
    public outGiveBirth:WorkingNeuron;
    
    public x:number;
    public y:number;
    private moveVector:Victor;
    public viewAngle:number = 0;
    public age:number = 0;
    private _energy:number = 0;
    public color:Color;
    public generation:number = 0;
    public isDead:boolean = false;

    public get energy ():number {
        return this._energy;
    }

    public get brain ():NeuralNetwork {
        return this._brain;
    }

    constructor ()
    constructor (mother:Creature)
    constructor (json:JSON)
    constructor (motherOrJSONOrNull = null)  {

        this.moveVector = new Victor (0,0);

        if(motherOrJSONOrNull == null){
            this.init ();
        }else if(motherOrJSONOrNull instanceof Creature) {
            this.initFromCreature (motherOrJSONOrNull)
        }else{
            this.initFromJSON (motherOrJSONOrNull);
        }
    }

    private init ():void{
        this.generation = 0;
        this.id = Creature.creatureCount ++;
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
        this.x = json['x'];
        this.y = json['y'];
        this.color = new Color(json['color'].color);
        this.viewAngle = json['viewAngle'];
        this.moveVector = new Victor(json['moveVector'].x, json['moveVector'].y);
        this.age = json['age'];
        this.isDead = json['isDead'];

        this._brain = new NeuralNetwork ();

        this.inputFood = InputNeuron.fromJSON (json['inputFood']);
        this.inputEnergy = InputNeuron.fromJSON (json['inputEnergy']);
        this.inputAge = InputNeuron.fromJSON (json['inputAge']);
        this.outEat = WorkingNeuron.fromJSON (json['outEat']);
        this.outRotate = WorkingNeuron.fromJSON (json['outRotate']);
        this.outMove = WorkingNeuron.fromJSON (json['outMove']);
        this.outGiveBirth = WorkingNeuron.fromJSON (json['outGiveBirth']);


        this.initBrain ();
        this._brain.setConnectionTargets (); 

        this._energy = json['_energy'];
    }

    private initFromCreature (creature:Creature):void {
        this.initFromJSON(creature.toJSON());
        this.id = Creature.creatureCount ++;
        this.viewAngle = Math.random () * Math.PI * 2;
        this._energy = Creature.START_ENERGY;
        this.age = 0;
        this.generation = creature.generation + 1;
        // this.color = new Color (this.color.)

    }

    public static fromJSON (json:JSON):Creature {
        return new Creature (json);
    }

    public toJSON ():any {
        return this;
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

        this.updateInputNeurons ();
        const tile:Tile = Alias.world.tileMap.getTileAt (this.x, this.y);
        const costMultiplier:number = this.calcCostMultiplier ();
        this.rotate (costMultiplier, timeDelta);
        this.moveVector.x = Math.sin(this.viewAngle);
        this.moveVector.y = Math.cos(this.viewAngle);
        this.move (costMultiplier, timeDelta);
        this.eat (tile, costMultiplier, timeDelta);
        this.checkGiveBirth ();
        this._energy -= Creature.COST_PERMANENT * costMultiplier;
        this.age += .1 * timeDelta;
        this.checkDie ();
    }

    private updateInputNeurons ():void {
        const tile:Tile = Alias.world.tileMap.getTileAt (this.x, this.y);
        this.inputFood.input = tile.foodAmount / Tile.MAX_FOOD_AMOUNT;
        this.inputEnergy.input = (this._energy - Creature.MINIMUM_SURVIVALENERGY) / (Creature.START_ENERGY - Creature.MINIMUM_SURVIVALENERGY);
        this.inputAge.input = this.age / 10;
    }    


    private calcCostMultiplier ():number {
        
        if(Alias.world.tileMap.getTileAt (this.x, this.y).type == TileType.Water)
            return 2 * this.age;
        else
            return 1 * this.age;
    }

    private isAbleToGiveBirth() {
        return this._energy > Creature.START_ENERGY + Creature.MINIMUM_SURVIVALENERGY * 1.1 && this.age > Creature.MINIMUM_AGE_TO_GIVE_BIRTH;
    }

    private eat (tile:Tile, costMultiplier:number, timeDelta:number):void {
        const eatWish:number = MathUtils.clamp01 (this.outEat.output);
        const wantsToEat:number = eatWish * Creature.EAT_GAIN * timeDelta; 
        const actualFoodAmount:number = tile.eat (wantsToEat);
        this._energy += actualFoodAmount;
    }

    private rotate (costMultiplier:number, timeDelta:number):void {
        const rotateForce = MathUtils.clampNegPos(this.outRotate.output);
        this.viewAngle += rotateForce * Creature.ROTATE_FACTOR * timeDelta;
        this._energy -= Math.abs(rotateForce * Creature.COST_ROTATE * timeDelta * costMultiplier);
    }

    private move (costMultiplier:number, timeDelta:number):void {
        const moveForce = MathUtils.clampNegPos(this.outMove.output);
        this.moveVector.multiplyScalar (moveForce * Creature.MOVE_FACTOR);
        if(Alias.world.tileMap.isOnTile (this.x + this.moveVector.x, this.y + this.moveVector.y)){
            this.x += this.moveVector.x;
            this.y += this.moveVector.y;
        }
        this._energy -= Math.abs(moveForce * Creature.COST_MOVE * timeDelta * costMultiplier);
    }

    private checkGiveBirth ():void {
        if(this.outGiveBirth.output > 0 && this.isAbleToGiveBirth ()){
            this.giveBirth ();
        }
    }

    private giveBirth ():void {
        console.log("-- giveBirth --", this);
        const child:Creature = new Creature (this);
        Alias.world.addCreature(child);

    }

    private checkDie ():void {
        if(this._energy < Creature.MINIMUM_SURVIVALENERGY){
            Alias.world.letCreatureDie (this);
        }
    }

}
