import { GenericMapCanvasComponent } from './../generic-map-canvas/generic-map-canvas.component';
import { MainService } from './../../main.service';
import { TickService } from './../../tick.service';
import { Creature } from './../../world/Creature';

import { Component, OnInit, Input, Output, ElementRef, ViewChild, OnDestroy, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creatures-canvas',
  templateUrl: './creatures-canvas.component.html',
  styleUrls: ['./creatures-canvas.component.css']
})
export class CreaturesCanvasComponent extends GenericMapCanvasComponent {

    private _creatures:Creature[];

    @Output('selectcreature')
    public readonly selectCreature:EventEmitter<Creature> = new EventEmitter ();

    @Input('creatures')
    public set creatures (value:Creature[]){
        this._creatures = value;
        requestAnimationFrame(()=>this.draw());
    }


    public doClick (x:number, y:number):void {
        console.log("doClick: " + x + "|" + y);
        const creature:Creature = this.findCreatureByPosition (x, y);
        if(creature != null){
            this.selectCreature.emit (creature);
        }        
    }

    constructor(
        elementRef:ElementRef,
        tickService:TickService,
        mainService:MainService
    ) { 
        super (elementRef, tickService, mainService);
        this.blitting = true;
    }


    private findCreatureByPosition (x:number, y:number) {
        for(const creature of this._creatures) {
            if(x >= creature.x * this.scale && x < (creature.x + creature.width) * this.scale 
                && y >= creature.y * this.scale && y < (creature.y + creature.height) * this.scale){
                return creature;
            }
        }
        return null;
    }

    protected doDraw (context:CanvasRenderingContext2D):void {
        context.clearRect (0, 0, this.canvasWidth, this.canvasHeight);

        for(let i:number = 0; i < this._creatures.length; ++i){
            const creature:Creature = this._creatures[i];
            const color:string = this.getBackgroundColor (creature);
            context.fillStyle = color;

            context.fillRect (creature.x * this.scale, creature.y * this.scale, creature.width * this.scale, creature.height * this.scale);                

            if(parseInt(color, 16) < 0xcccccc){
                context.fillStyle = 'black';
            }else{
                context.fillStyle = 'white';
            }

            context.fillRect ((creature.x + creature.width / 10) * this.scale, 
                                creature.y * this.scale, 
                                (creature.width / 5) * this.scale, 
                                (creature.width / 5) * this.scale);

            context.fillRect ((creature.x + creature.width / 2) * this.scale, 
                                creature.y * this.scale, 
                                (creature.width / 5) * this.scale, 
                                (creature.width / 5) * this.scale);
        }
    }

    private getBackgroundColor (creature:Creature):string {
        return creature.color.rgb ().toString ();
    }

}
