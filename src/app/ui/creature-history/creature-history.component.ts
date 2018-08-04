import { TickService } from './../../tick.service';
import { Creature } from './../../world/Creature';
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-creature-history',
  templateUrl: './creature-history.component.html',
  styleUrls: ['./creature-history.component.css']
})
export class CreatureHistoryComponent implements OnInit {

    @Input ('creature')
    public set creature(value:Creature){
        this._creature = value;
        if(this._creature != null){
            this.lastHistoryLength = -1;
            this.setUpChart ();
            this.draw ();
        }
    }

    public get creature ():Creature {
        return this._creature;
    }

    private lastHistoryLength:number = 0;
    private _creature:Creature;

    private chart:Chart;

    constructor(
        private tickService:TickService
    ) { }

    ngOnInit() {      
        
      //  this.setUpChart ();
        this.tickService.draw.subscribe (()=> {
            if(this._creature && (this._creature.__history.length != this.lastHistoryLength)){
                this.draw();
                this.lastHistoryLength = this._creature.__history.length;
            }
        });
        
    }

    private setUpChart(): void {

        if(this.chart)
            this.chart.destroy ();

        var config: Chart.ChartConfiguration = {};
        var options: Chart.ChartOptions = {};
        
        options.title = {
            display: true,
            text: "Creature: " + this._creature.id + " | " + this._creature.name
        };
        options.animation = { duration: 0 };
        options.legend = {

        }
        options.scales = {
            xAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Times' } }],
            yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'Output or Weight' } }],

        }

        config.type = 'line';
        config.options = options;


        this.chart = new Chart('chart-canvas', config);


        }

    private createSteps(start: number, len: number): number[] {
        var result: number[] = [];
        for (let i: number = start; i < start + len; i++) {
            result.push(i);
        }
        return result;
    }
    
    private draw ():void {

        const steps:number [] = this.createSteps (0, this._creature.__history.length);
        var datasets: any[] = [];
        datasets = datasets.concat(this.getValues ('Energy', '_energy', 'red'));
        datasets = datasets.concat(this.getValues ('Child Count', 'childCount', 'green'));

        this.chart.data = {
            labels: steps.map((value: number, index: number, array: number[]) => { return String(value) }),
            datasets: datasets

        };
        this.chart.update();
    }

    private getValuesByKey (a:any[], key:string):any[]{
        const result:any[] = [];
        for(let i:number = 0; i < a.length; ++i){
            result.push(a[i][key]);
        }
        return result;
    }

    private getValues (label:string, key:string, color:string):any{
        var result: any[] = [];
        return ({
                hidden: false,
                lineTension: 0,
                label: label,
                fill: false,
                backgroundColor: color,
                borderColor: color,
                data: this.getValuesByKey (this._creature.__history, key)
            });
        
    }

}
