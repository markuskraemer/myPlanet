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

export class Creature {

    private static EAT_GAIN:number = 1;
    private static ROTATE_FACTOR:number = 1;
    private static MOVE_FACTOR:number = 5;
    
    private static COST_ROTATE:number = 5;
    private static COST_MOVE:number = 1;
    private static COST_PERMANENT:number = 1;
    private static COST_EAT:number = .1;

    private static creatureCount:number = 0;
    public id:number;
    private brain:NeuralNetwork;

    public inputFood:InputNeuron;
    
    public outEat:WorkingNeuron;
    public outRotate:WorkingNeuron;
    public outMove:WorkingNeuron;

    public x:number;
    public y:number;
    private moveVector:Victor;
    public viewAngle:number = 0;
    private _energy:number = 0;
    
    public get energy ():number {
        return this._energy;
    }

    constructor (doInit:boolean = true) {
        if(doInit) {
            this.id = Creature.creatureCount ++;
            this._energy = 200;
            this.moveVector = new Victor (0,0);
            this.createBrain ();
            this.initBrain ();
            this.brain.generateMesh (); 
            this.brain.setConnectionTargets (); 
            this.brain.randomizeWeights ();
        }
    }

    public static fromJSON (json:JSON):Creature {
        const creature:Creature = new Creature (false);
        creature.id = json['id'];
        creature.x = json['x'];
        creature.y = json['y'];

        creature.brain = new NeuralNetwork ();

        creature.inputFood = InputNeuron.fromJSON (json['inputFood']);
        creature.outEat = WorkingNeuron.fromJSON (json['outEat']);
        creature.outRotate = WorkingNeuron.fromJSON (json['outRotate']);
        creature.outMove = WorkingNeuron.fromJSON (json['outMove']);

        creature.initBrain ();
        creature.brain.setConnectionTargets (); 

        creature._energy = json['_energy'];

        return creature;
    }

    public toJSON ():any {
        return this;
    }


    private createBrain ():void {
        this.brain = new NeuralNetwork ();

        this.inputFood = new InputNeuron ();
        this.outEat = new WorkingNeuron (0);
        this.outRotate = new WorkingNeuron (0);
        this.outMove = new WorkingNeuron (0);

        this.inputFood.id = CreatureNeuronIds.IN_FOOD;
        this.outEat.id = CreatureNeuronIds.OUT_EAT;
    }

    private initBrain ():void {
        this.brain.addInputNeuron (this.inputFood); 
        this.brain.addOutputNeuron (this.outEat);
        this.brain.addOutputNeuron (this.outRotate);
        this.brain.addOutputNeuron (this.outMove);
    }

    public tick (timeDelta:number):void {
        const tile:Tile = Alias.world.tileMap.getTileAt (this.x, this.y);
        const costMultiplier:number = this.calcCostMultiplier ();
        this.inputFood.input = tile.foodAmount;
        this.rotate (costMultiplier, timeDelta);
        this.moveVector.x = Math.sin(this.viewAngle);
        this.moveVector.y = Math.cos(this.viewAngle);
        this.move (costMultiplier, timeDelta);
        this.eat (tile, costMultiplier, timeDelta);
        this._energy -= Creature.COST_PERMANENT * costMultiplier
    }

    private calcCostMultiplier ():number {
        
        if(Alias.world.tileMap.getTileAt (this.x, this.y).type == TileType.Water)
            return 2;
        else
            return 1;
    }

    private eat (tile:Tile, costMultiplier:number, timeDelta:number):void {
        const eatWish:number = MathUtils.clamp01 (this.outEat.output);
        const wantsToEat:number = eatWish * Creature.EAT_GAIN * timeDelta; 
        const actualFoodAmount:number = tile.eat (wantsToEat);
        this._energy += actualFoodAmount;
        this._energy -= Creature.COST_PERMANENT * timeDelta * costMultiplier;
    }

    private rotate (costMultiplier:number, timeDelta:number):void {
        const rotateForce = MathUtils.clampNegPos(this.outRotate.output);
        this.viewAngle += rotateForce * Creature.ROTATE_FACTOR * timeDelta;
        this._energy -= Math.abs(rotateForce * Creature.COST_ROTATE * timeDelta * costMultiplier);
    }

    private move (costMultiplier:number, timeDelta:number):void {
        const moveForce = MathUtils.clampNegPos(this.outMove.output);
        this.moveVector.multiplyScalar (moveForce * Creature.MOVE_FACTOR);
        this.x += this.moveVector.x;
        this.y += this.moveVector.y;
        this._energy -= Math.abs(moveForce * Creature.COST_MOVE * timeDelta * costMultiplier);
    }

}
