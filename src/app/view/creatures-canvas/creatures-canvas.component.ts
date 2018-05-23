import { MainService } from './../../main.service';
import { TickService } from './../../tick.service';
import { Creature } from './../../world/Creature';

import { Component, OnInit, Input, Output, ElementRef, ViewChild, OnDestroy, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creatures-canvas',
  templateUrl: './creatures-canvas.component.html',
  styleUrls: ['./creatures-canvas.component.css']
})
export class CreaturesCanvasComponent implements OnInit, OnDestroy {

    private _creatures:Creature[];
    private subscribtion:any;
    private tileSize:number = 25;

    @HostListener('click', ['$event']) 
    private onClick(e:MouseEvent) {
        console.log("onClick: ", e);
        const creature:Creature = this.findCreatureByPosition (e.offsetX, e.offsetY);
        if(creature != null){
            this.selectCreature.emit (creature);
        }
    }

    @Output('selectcreature')
    public readonly selectCreature:EventEmitter<Creature> = new EventEmitter ();

    @ViewChild ('canvas')
    public canvas:ElementRef;

    @ViewChild ('canvas2')
    public canvas2:ElementRef;

    @Input('creatures')
    public set tileMap (value:Creature[]){
        this._creatures = value;
        requestAnimationFrame(()=>this.draw());
    }

    constructor(
        private elementRef:ElementRef,
        private tickService:TickService,
        private mainService:MainService
    ) { 
    }

    ngOnInit() {
        this.subscribtion = this.tickService.tick.subscribe (()=>this.draw ());
    }

    ngOnDestroy () {
        this.subscribtion.unsubscribe ();
    }

    private findCreatureByPosition (x:number, y:number){
        for(const creature of this._creatures){
            if(x >= creature.x && x < creature.x + creature.width && y >= creature.y && y < creature.y + creature.height){
                return creature;
            }
        }
        return null;
    }


    private draw ():void {
        const show1:boolean = this.tickService.ticks % 2 == 0;
        let context:CanvasRenderingContext2D = show1 ? this.canvas.nativeElement.getContext ('2d') : this.canvas2.nativeElement.getContext ('2d'); 
        context.clearRect (0, 0, this.canvasWidth, this.canvasHeight);

        for(let i:number = 0; i < this._creatures.length; ++i){
            const creature:Creature = this._creatures[i];
          
            context.fillStyle = this.getBackgroundColor (creature);

            if(this.mainService.world.inspectedCreature == creature){
                context.strokeStyle = 'yellow';
                context.strokeRect (creature.x - creature.width, creature.y - creature.height, creature.width*2, creature.height*2);
                context.fillRect (creature.x - creature.width, creature.y - creature.height, creature.width*2, creature.height*2);
            }else{
                context.fillRect (creature.x, creature.y, creature.width, creature.height);                
            }

            context.fillStyle = 'black';
            context.fillRect (creature.x + 2, creature.y, 2, 2);
            context.fillRect (creature.x + 6, creature.y, 2, 2);
        }

        if(show1){
            this.canvas.nativeElement.style.display = 'block';
            this.canvas2.nativeElement.style.display = 'none';
        }else{
            this.canvas.nativeElement.style.display = 'none';
            this.canvas2.nativeElement.style.display = 'block';
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
