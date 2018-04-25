import { CreatureNeuronIds } from './CreatureNeuronIds';
import { WorkingNeuron } from './../network/WorkingNeuron';
import { NeuralNetwork } from './../network/NeuralNetwork';
import { InputNeuron } from './../network/InputNeuron';

export class Creature {

    private static creatureCount:number = 0;
    private count:number;
    private brain:NeuralNetwork;
    private inputFood:InputNeuron;
    private outEat:WorkingNeuron;

    constructor (doInit:boolean = true){
        if(doInit) {
            this.count = Creature.creatureCount ++;
            this.createBrain ();
            this.initBrain ();
            this.brain.generateMesh (); 
            this.brain.setConnectionTargets (); 
            this.brain.randomizeWeights ();
        }
    }

    public static fromJSON (json:JSON):Creature {
        const creature:Creature = new Creature (false);
        creature.count = json['count'];

        creature.brain = new NeuralNetwork ();

        creature.inputFood = InputNeuron.fromJSON (json['inputFood']);
        creature.outEat = WorkingNeuron.fromJSON (json['outEat']);

        creature.initBrain ();

        return creature;
    }

    public toJSON ():any {
        return { 
                count: 'creature_' + this.count,
                inputFood: this.inputFood, 
                outEat: this.outEat, 
            };
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

}
