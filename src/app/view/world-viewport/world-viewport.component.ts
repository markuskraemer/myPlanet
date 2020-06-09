import { TileMap } from './../../world/TileMap';
import { CreaturesCanvasComponent } from './../creatures-canvas/creatures-canvas.component';
import { MainService } from './../../main.service';
import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-world-viewport',
  templateUrl: './world-viewport.component.html',
  styleUrls: ['./world-viewport.component.css']
})
export class WorldViewportComponent implements OnInit, OnDestroy {

    public readonly tileSize:number = 20;

    public mouseIsDown:boolean = false;
    public startMouseX:number = 0;
    public startMouseY:number = 0;
    public mouseDownX:number = 0;
    public mouseDownY:number = 0;

    public viewportX:number = 0;
    public viewportY:number = 0;
    public scale:number = 1;
    public oldScale:number = 1;
    private scaleFactor:number = 1.1;
    private onMouseUpRef:(event:MouseEvent) => void;

    @ViewChild ('viewport')
    public viewport:any;

    @ViewChild ('creaturecanvas')
    public creaturecanvas:CreaturesCanvasComponent;

    constructor(
        public mainService:MainService
    ) { 
        this.onMouseUpRef = (event:MouseEvent) => { 
            this.mouseIsDown = false;
        }
    }

    ngOnInit() {
        window.addEventListener('mouseup', this.onMouseUpRef);
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
        }else if(event.deltaY < 0)
        {
            this.scale /= this.scaleFactor;
        }
        this.updateViewportScale (event);
        event.preventDefault ();
        
    }
    
    public toLocal (eventX:number, eventY:number):{x:number, y:number} {
        const sizeXAtScale1:number = (eventX - this.viewportX) / this.scale;
        const sizeYAtScale1:number = (eventY - this.viewportY) / this.scale;

        const x:number  = sizeXAtScale1;// - this.viewportX;
        const y:number = sizeYAtScale1;// - this.viewportY;
        
        return {x:x, y:y};
    }

    private updateViewportScale (event:MouseWheelEvent):void {
                
        const sizeXAtScale1:number = (event.offsetX - this.viewportX) / this.oldScale;
        const sizeYAtScale1:number = (event.offsetY - this.viewportY) / this.oldScale;

        this.viewportX = event.offsetX - sizeXAtScale1 * this.scale;
        this.viewportY = event.offsetY - sizeYAtScale1 * this.scale;

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

        const vpWidth:number = 800;
        const vpHeight:number = 800;

        var origW  = 800; 
        var origH  = 800;  

        const left:number = 0;
        const right:number = -origW * this.scale  * viewportScale + origW;
        const top:number = 0;
        const bottom:number = -origH * this.scale * viewportScale + origH;

        this.viewportX = Math.min(left, this.viewportX);
        this.viewportX = Math.max(right, this.viewportX);
       
        this.viewportY = Math.min(top, this.viewportY);
        this.viewportY = Math.max(bottom, this.viewportY);
        
        this.viewport.nativeElement.style.transform = 
            'translate(' + this.viewportX + 'px, ' + this.viewportY + 'px)'
            + ' scale(' + this.scale + ')';
   
    }



}
