import { TickService } from './../../tick.service';
import { MathUtils } from './../../utils/MathUtils';
import { Connection } from './../../network/Connection';
import { WorkingNeuron } from './../../network/WorkingNeuron';
import { NeuralNetwork } from './../../network/NeuralNetwork';
import { Neuron } from './../../network/Neuron';
import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-neuralNetwork',
  templateUrl: './neuralNetwork.component.html',
  styleUrls: ['./neuralNetwork.component.css']
})
export class NeuralNetworkComponent implements OnInit {

    @Input('network')
    public set network (n:NeuralNetwork) {
        this._network = n;
        if(this._network){
            this.draw ();
        }
    }

    public get network ():NeuralNetwork {
        return this._network;
    }

    @ViewChild ('canvas')
    public canvas:ElementRef;
    private marginTopBottom:number = 20;
    private context:CanvasRenderingContext2D;
    private width:number;
    private height:number;
    private radius:number;
    private _network:NeuralNetwork;

    constructor(
        private elementRef:ElementRef,
        private tickService:TickService
    ) { }

    ngOnInit() {
        console.log("onInit");
        const canvas:HTMLCanvasElement = this.canvas.nativeElement;
        this.context = canvas.getContext ('2d');
        this.tickService.tick.subscribe ( () => this.draw ());
    }

    public get canvasWidth ():number {
        return this.elementRef.nativeElement.clientWidth;
    }

    public get canvasHeight ():number {
        return this.elementRef.nativeElement.clientHeight;
    }


    private draw ():void {
        this.radius = 10;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.context.clearRect (0, 0, this.width, this.height);

        if(this._network){

            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';

            this.drawOutputLayer ();
            this.drawInputLayer ();
            this.drawConnections ();
            this.drawOutputs ();
            this.drawInputs ();
        }
    }

    private drawOutputs ():void {
        for(let i:number = 0; i < this._network.outputLayer.length; ++i){
            const neuron:Neuron = this._network.outputLayer[i];
            this.context.beginPath();
            this.context.fillStyle = 'pink';//this.getColor (neuron.output);
            this.context.arc(this.getOutputNeuronX (i), this.getNeuronY (i), Math.abs(neuron.output) * this.radius, 0, 2 * Math.PI, false);
            this.context.fill();
        }
    }

    private drawInputs ():void {
        for(let i:number = 0; i < this._network.inputLayer.length; ++i){
            const neuron:Neuron = this._network.inputLayer[i];
            this.context.beginPath();
            this.context.fillStyle = this.getColor (neuron.output);
            this.context.arc(this.getInputNeuronX (i), this.getNeuronY (i), Math.abs(neuron.output) * this.radius, 0, 2 * Math.PI, false);
            this.context.fill();
        }
    }



    private drawOutputLayer ():void {
        this.context.strokeStyle = 'black';

        for(let i:number = 0; i < this._network.outputLayer.length; ++i){
            const neuron:Neuron = this._network.outputLayer[i];
            this.context.beginPath();
            this.context.arc(this.getOutputNeuronX (i), this.getNeuronY (i), this.radius, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.font = '10px Arial';
            this.context.lineWidth = 1;
            this.context.strokeText (neuron.id, this.getOutputNeuronX (i) + this.radius + 10, this.getNeuronY (i) + 5);
        }
    }

    private drawInputLayer ():void {
        this.context.strokeStyle = 'black';

        for(let i:number = 0; i < this._network.inputLayer.length; ++i){
            const neuron:Neuron = this._network.inputLayer[i];
            this.context.beginPath();
            this.context.arc(this.getInputNeuronX (i), this.getNeuronY (i), this.radius, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.font = '10px Arial';
            this.context.lineWidth = 1;
            this.context.strokeText (neuron.id, this.getInputNeuronX (i) - this.radius - 80, this.getNeuronY (i) + 5);

        }
    }

    private drawConnections ():void {
        for(let i:number = 0; i < this._network.outputLayer.length; ++i){
            const neuron:WorkingNeuron = this._network.outputLayer[i];
            for(let j:number = 0; j < neuron.connections.length; ++j){
                const connection:Connection = neuron.connections[j];
                this.context.strokeStyle = this.getColor (connection.weight);
                this.context.beginPath ();
                this.context.moveTo (this.getOutputNeuronX (i), this.getNeuronY (i));
                this.context.lineTo (this.getInputNeuronX (j), this.getNeuronY (j));
                this.context.stroke ();
            }
        }        
    }

    private getColor (n:number):string {

        if(n < 0){
            return 'rgb(' + n * -255 + ',0,0)';
        }else{
            return 'rgb(0,' + n * 255 + ',0)';
        }
    }

    private getOutputNeuronX (index:number):number {
        return this.width - 100 - this.radius;
    }

    private getNeuronY (index:number):number {
        const offset:number = (this.height - this.radius*2 - this.marginTopBottom*2) / (this._network.outputLayer.length-1);  
        return offset * index + this.radius + this.marginTopBottom;
    }

    private getInputNeuronX (index:number):number {
        return 100 + this.radius;
    }
}
