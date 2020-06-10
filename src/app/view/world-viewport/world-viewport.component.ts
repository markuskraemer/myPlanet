import { TileMap } from './../../world/TileMap';
import { CreaturesCanvasComponent } from './../creatures-canvas/creatures-canvas.component';
import { MainService } from './../../main.service';
import { Component, OnInit, OnDestroy, HostListener, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-world-viewport',
  templateUrl: './world-viewport.component.html',
  styleUrls: ['./world-viewport.component.css']
})
export class WorldViewportComponent implements AfterViewInit, OnDestroy {

    public readonly tileSize:number = 20;

    public mouseIsDown:boolean = false;
    public startMouseX:number = 0;
    public startMouseY:number = 0;
    public mouseDownX:number = 0;
    public mouseDownY:number = 0;

    public viewportX:number = 0;
    public viewportY:number = 0;
    private scale:number = 1;
    private oldScale:number = this.scale;
    private readonly scaleFactor:number = 1.1;
    private readonly maxScale = 4;
    private readonly origWidth = 800; 
    private readonly origHeight = 800;  
    private onMouseUpRef:(event:MouseEvent) => void;

    @ViewChild ('viewport')
    public viewport:any;

    @ViewChild ('creaturecanvas')
    public creaturecanvas:CreaturesCanvasComponent;

    public set scale100(value: number) {
        this.scale = Math.min(this.maxScale, value / 200);
        this.updateViewportScale(this.origWidth/2, this.origHeight/2);
        this.oldScale = this.scale;
    }

    public get scale100(){
        return this.scale * 200 | 0;
    }

    constructor(
        public mainService:MainService
    ) { 
        this.onMouseUpRef = (event:MouseEvent) => { 
            this.mouseIsDown = false;
        }
    }

    ngAfterViewInit() {
        window.addEventListener('mouseup', this.onMouseUpRef);
        this.updateViewportTransform();
    }

    ngOnDestroy () {
        window.removeEventListener('mouseup', this.onMouseUpRef);
    }

    public onMouseDown (event:MouseEvent) {
        this.mouseDownX = event.offsetX;
        this.mouseDownY = event.offsetY;
        this.startMouseX = event.offsetX - this.viewportX;
        this.startMouseY = event.offsetY - this.viewportY;
        this.mouseIsDown = true;
        event.preventDefault();
    }

    public onMouseUp (event:MouseEvent) {
        const deltaX:number = this.mouseDownX - event.offsetX;
        const deltaY:number = this.mouseDownY - event.offsetY;
        const threshold:number = 10;
        const dist:number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);     
        if(dist < threshold){
            const localPoint:{x:number, y:number} = this.toLocal (event.offsetX, event.offsetY);
            this.creaturecanvas.doClick (localPoint.x, localPoint.y);
        }else{
            if(this.mouseIsDown){
                this.updateViewportPosition(event);
            }
        }
        this.mouseIsDown = false;

        
    }

    public onMouseMove (event:MouseEvent) {
        if(this.mouseIsDown){
            this.updateViewportPosition(event);
        }
    }

    public onMouseWheel (event:WheelEvent) {
        
        if(event.deltaY > 0){
            this.scale *= this.scaleFactor;
            if(this.scale > this.maxScale) {
                this.scale = this.maxScale;
            }
        }else if(event.deltaY < 0) {
            this.scale /= this.scaleFactor;
        }
        this.updateViewportScale (event.offsetX, event.offsetY);
        event.preventDefault ();
        
    }
    
    public toLocal (eventX:number, eventY:number):{x:number, y:number} {
        const sizeXAtScale1:number = (eventX - this.viewportX) / this.scale;
        const sizeYAtScale1:number = (eventY - this.viewportY) / this.scale;

        const x:number  = sizeXAtScale1;// - this.viewportX;
        const y:number = sizeYAtScale1;// - this.viewportY;
        
        return {x:x, y:y};
    }

    private updateViewportScale (offsetX: number, offsetY: number):void {
                
        const sizeXAtScale1:number = (offsetX - this.viewportX) / this.oldScale;
        const sizeYAtScale1:number = (offsetY - this.viewportY) / this.oldScale;

        this.viewportX = offsetX - sizeXAtScale1 * this.scale;
        this.viewportY = offsetY - sizeYAtScale1 * this.scale;

        this.updateViewportTransform ();            

        this.oldScale = this.scale;
    }


    private updateViewportPosition (event:MouseEvent):void {
        this.viewportX = event.offsetX - this.startMouseX;
        this.viewportY = event.offsetY - this.startMouseY;
        this.updateViewportTransform ();
    }

    private updateViewportTransform ():void {
        
        const viewportScale:number = this.tileSize / TileMap.TILE_SIZE;        
        this.scale = Math.max(this.scale, 1 / viewportScale);

        const left:number = 0;
        const right:number = -this.origWidth * this.scale  * viewportScale + this.origWidth;
        const top:number = 0;
        const bottom:number = -this.origHeight * this.scale * viewportScale + this.origHeight;

        this.viewportX = Math.min(left, this.viewportX);
        this.viewportX = Math.max(right, this.viewportX);
       
        this.viewportY = Math.min(top, this.viewportY);
        this.viewportY = Math.max(bottom, this.viewportY);
        
        this.viewport.nativeElement.style.transform = 
            'translate(' + this.viewportX + 'px, ' + this.viewportY + 'px)'
            + ' scale(' + this.scale + ')';
   
    }



}
