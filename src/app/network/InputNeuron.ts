﻿import { Neuron } from './Neuron';

export class InputNeuron extends Neuron
{
    protected _input: number = 0;
 
    public static fromJSON (json:JSON):InputNeuron {
        const inputNeuron:InputNeuron = new InputNeuron ();
        inputNeuron.input = json['input'];
        inputNeuron.id = json['id'];
        return inputNeuron;        
    }

    public toJSON(): any {
        let { output, id, input } = this;
        return { output, id, input };
    }

    public get output(): number
    {
        return (this._input);
    }

    public get input(): number
    {
        return this._input;
    }

    public set input(n: number)
    {
        this._input = n;
    }


}