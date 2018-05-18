import { TickService } from './../../tick.service';
import { Creature } from './../../world/Creature';

import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-creatures-canvas',
  templateUrl: './creatures-canvas.component.html',
  styleUrls: ['./creatures-canvas.component.css']
})
export class CreaturesCanvasComponent implements OnInit, OnDestroy {

    @ViewChild ('canvas')
    public canvas:ElementRef;

    private _creatures:Creature[];
    private subscribtion:any;

    @Input('creatures')
    public set tileMap (value:Creature[]){
        this._creatures = value;
        this.determineContext ();
        requestAnimationFrame(()=>this.draw());
    }

    private context:CanvasRenderingContext2D;
    private tileSize:number = 25;
    constructor(
        private elementRef:ElementRef,
        private tickService:TickService
    ) { }

    ngOnInit() {
        this.determineContext ();
        this.subscribtion = this.tickService.tick.subscribe (()=>this.draw ());
    }

    ngOnDestroy () {
        this.subscribtion.unsubscribe ();
    }

    private determineContext (){
        const canvas:HTMLCanvasElement = this.canvas.nativeElement;
        this.context = canvas.getContext ('2d');        
    }

    private draw ():void {
        this.context.clearRect (0, 0, this.canvasWidth, this.canvasHeight);
        for(let i:number = 0; i < this._creatures.length; ++i){
            const creature:Creature = this._creatures[i];
          
            this.context.fillStyle = this.getBackgroundColor (creature);
            this.context.fillRect (creature.x, creature.y, 10, 10);

              this.context.fillStyle = 'black';
            this.context.fillRect (creature.x + 2, creature.y, 2, 2);
            this.context.fillRect (creature.x + 6, creature.y, 2, 2);
            
        }
    }

    private getBackgroundColor (create:Creature):string {
        return create.color.rgb ().toString ();
    }

    public get canvasWidth ():number {
        return 800;
    }

    public get canvasHeight ():number {
        return 800;
    }

}
