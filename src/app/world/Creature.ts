import { Tile } from './Tile';
import { Alias } from './../Alias';
import { World } from './World';
import { CreatureNeuronIds } from './CreatureNeuronIds';
import { WorkingNeuron } from './../network/WorkingNeuron';
import { NeuralNetwork } from './../network/NeuralNetwork';
import { InputNeuron } from './../network/InputNeuron';

export class Creature {

    private static EAT_GAIN:number = 1;

    private static creatureCount:number = 0;
    public id:number;
    private brain:NeuralNetwork;
    public inputFood:InputNeuron;
    public outEat:WorkingNeuron;
    public x:number;
    public y:number;
    private _energy:number = 0;
    
    public get energy ():number {
        return this._energy;
    }

    constructor (doInit:boolean = true) {
        if(doInit) {
            this.id = Creature.creatureCount ++;
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

        creature.initBrain ();
        creature.brain.setConnectionTargets (); 

        creature._energy = json['_energy'];

        return creature;
    }

    public toJSON ():any {
        return this;
                /*
                id: this.id,
                inputFood: this.inputFood, 
                outEat: this.outEat,
                _energy: this._energy
                */ 
    }


    private createBrain ():void {
        this.brain = new NeuralNetwork ();

        this.inputFood = new InputNeuron ();
        this.outEat = new WorkingNeuron (0);

        this.inputFood.id = CreatureNeuronIds.IN_FOOD;
        this.outEat.id = CreatureNeuronIds.OUT_EAT;
    }

    private initBrain ():void {
        this.brain.addInputNeuron (this.inputFood); 
        this.brain.addOutputNeuron (this.outEat);
    }

    public tick (timeDelta:number):void {
        const tile:Tile = Alias.world.getTileAt (this.x, this.y);
        this.inputFood.input = tile.foodAmount;
        this.eat (timeDelta);
    }

    private eat (timeDelta:number):void {
        const tile:Tile = Alias.world.getTileAt (this.x, this.y);
        const eatWish:number = this.outEat.output;
        this._energy += eatWish * Creature.EAT_GAIN * tile.foodAmount * timeDelta;
    }

}
