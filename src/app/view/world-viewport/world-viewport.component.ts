import { CreaturesCanvasComponent } from './../creatures-canvas/creatures-canvas.component';
import { MainService } from './../../main.service';
import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-world-viewport',
  templateUrl: './world-viewport.component.html',
  styleUrls: ['./world-viewport.component.css']
})
export class WorldViewportComponent implements OnInit, OnDestroy {

    public mouseIsDown:boolean = false;
    public startMouseX:number = 0;
    public startMouseY:number = 0;
    public mouseDownX:number = 0;
    public mouseDownY:number = 0;

    public viewPortX:number = 0;
    public viewPortY:number = 0;
    public scale:number = 1;
    private onMouseUpRef:(event:MouseEvent) => void;

    public onMouseDown (event:MouseEvent) {
        console.log("md: ", event);
        this.mouseDownX = event.offsetX;
        this.mouseDownY = event.offsetY;
        this.startMouseX = event.offsetX - this.viewPortX;
        this.startMouseY = event.offsetY - this.viewPortY;
        this.mouseIsDown = true;
        event.preventDefault();
    }

    public onMouseUp (event:MouseEvent) {
        const deltaX:number = this.mouseDownX - event.offsetX;
        const deltaY:number = this.mouseDownY - event.offsetY;
        const threshold:number = 10;
        const dist:number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        console.log("mu: ", event);
        if(dist < threshold){
            console.log("trying to pass event");
            this.creaturecanvas.onClick (event);
        }else{
            if(this.mouseIsDown){
                this.updateViewportPosition(event);
            }
        }
        this.mouseIsDown = false;

        
    }

    public onMouseMove (event:MouseEvent) {
        if(this.mouseIsDown){
            console.log("mm: ", event);
            this.updateViewportPosition(event);
        }
    }

    public onMouseWheel (event:MouseWheelEvent) {
        
        if(event.wheelDelta > 0){
            this.scale += .1;
        }else if(event.wheelDelta < 0)
        {
            this.scale -= .1;
        }
        this._updateViewportScale (event);
        
    }



    private _updateViewportScale (event:MouseWheelEvent):void {

        var origH  = 800;  // original image height
        var origW  = 800; // original image width

        const left:number = event.offsetX - (event.offsetX) * this.scale;
        const top:number =  event.offsetY - (event.offsetY) * this.scale;

        this.viewPortX = left;
        this.viewPortY = top;

        this.viewport.nativeElement.style.transform = 
        
         'translate(' + left + 'px, ' + top + 'px)' 
          + ' scale(' + this.scale + ')';
          
    }

    private updateViewportPosition (event:MouseEvent):void {
        this.viewPortX = event.offsetX - this.startMouseX;
        this.viewPortY = event.offsetY - this.startMouseY;
        this.updateTransform ();
    }

    private updateTransform ():void {

        this.scale = Math.max(this.scale, 1);

        var origH  = 800;  
        var origW  = 800; 

        const left:number = 0;
        const right:number = -origW * this.scale + origW;
        const top:number = 0;
        const bottom:number = -origH * this.scale + origH;
/*
        this.viewPortX = Math.min(left, this.viewPortX);
        this.viewPortX = Math.max(right, this.viewPortX);
       
        this.viewPortY = Math.min(top, this.viewPortY);
        this.viewPortY = Math.max(bottom, this.viewPortY);
        */
        this.viewport.nativeElement.style.transform = 
            'translate(' + this.viewPortX + 'px, ' + this.viewPortY + 'px)' 
            + ' scale(' + this.scale + ')';
    }


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

}
