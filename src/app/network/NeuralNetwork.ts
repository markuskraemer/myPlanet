import { Connection } from './Connection';
import { WorkingNeuron } from './WorkingNeuron';
import { InputNeuron } from './InputNeuron';
export class NeuralNetwork {

    private inputLayer:InputNeuron[] = [];
    private outputLayer:WorkingNeuron[] = [];

    public addInputNeuron (inputNeuron:InputNeuron):void {
        this.inputLayer.push(inputNeuron);
    }

    public addOutputNeuron (outputNeuron:WorkingNeuron):void {
        this.outputLayer.push (outputNeuron);
    }

    public generateMesh ():void {
        for(const outputNeuron of this.outputLayer){
            for(const inputNeuron of this.inputLayer){
                const connection:Connection = new Connection ();
                outputNeuron.addConnection (connection);
            }
        }
    }

    public setConnectionTargets ():void {
        for(const outputNeuron of this.outputLayer){
            for(let i:number = 0; i < outputNeuron.connections.length; ++i){
                const connection:Connection = outputNeuron.connections[i];
                connection.fromNeuron = this.inputLayer[i]; 
            }
        } 
    } 

    public randomizeWeights ():void {
        for(const outputNeuron of this.outputLayer){
            for(const connection of outputNeuron.connections){
                connection.weight = Math.random () * 2 - 1; 
            }
        }        
    }


}
