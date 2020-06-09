import { MainService } from './../../main.service';
import { TickService } from './../../tick.service';
import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-generic-map-canvas',
  templateUrl: './generic-map-canvas.component.html',
  styleUrls: ['./generic-map-canvas.component.css']
})
export class GenericMapCanvasComponent implements AfterViewInit {

    private subscribtion:any;
    private _tileSize:number = 0;
    private _unscaledTileSize:number = 0;
    protected canvasWidth:number;
    protected canvasHeight:number;
    protected scale:number = 1;
    protected blitting:boolean;
    protected updateMod:number = 1;
    
    @ViewChild ('canvas')
    public canvas:ElementRef;

    @ViewChild ('canvas2')
    public canvas2:ElementRef;

    @Input('tileSize')
    public set tileSize (value:number){
        this._tileSize = value;
    } 

    public get tileSize ():number{
        return this._tileSize;
    }

    @Input('unscaledTileSize')
    public set unscaledTileSize (value:number){
        this._unscaledTileSize = value;
    } 

    public get unscaledTileSize ():number{
        return this._unscaledTileSize;
    }


    constructor(
        private elementRef:ElementRef,
        private tickService:TickService,
        private mainService:MainService
    ) { 
    }

    ngAfterViewInit() {

        this.scale = this._tileSize / this._unscaledTileSize;

        this.canvasWidth = this.elementRef.nativeElement.clientWidth * this.scale;
        this.canvasHeight = this.elementRef.nativeElement.clientHeight * this.scale;

        this.canvas.nativeElement.width = this.canvasWidth;
        this.canvas.nativeElement.height = this.canvasHeight;
        this.canvas2.nativeElement.width = this.canvasWidth;
        this.canvas2.nativeElement.height = this.canvasHeight;
        
        this.subscribtion = this.tickService.draw.subscribe (()=>{ 
            if(this.tickService.ticks % this.tickService.updateFrameModulo == 0){
                this.draw (); 
            }
        });
    }

    ngOnDestroy () {
        this.subscribtion.unsubscribe ();
    }


    protected draw ():void {
        if(this.tickService.ticks % this.updateMod == 0){
            const show1:boolean = this.blitting && Math.floor((this.tickService.ticks/this.updateMod) % 2) == 0;
            let context:CanvasRenderingContext2D = show1 ? this.canvas.nativeElement.getContext ('2d') : this.canvas2.nativeElement.getContext ('2d'); 

            this.doDraw (context);

            if(show1){
                this.canvas.nativeElement.style.display = 'block';
                this.canvas2.nativeElement.style.display = 'none';
            }else{
                this.canvas.nativeElement.style.display = 'none';
                this.canvas2.nativeElement.style.display = 'block';
            }
        }
    }

    protected doDraw (context:CanvasRenderingContext2D):void {
        // override this!
    }

}
