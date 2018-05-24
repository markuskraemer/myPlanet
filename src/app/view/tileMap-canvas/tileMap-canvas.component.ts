import { TickService } from './../../tick.service';
import { TileType } from './../../world/TileType.enum';
import { Tile } from './../../world/Tile';
import { TileMap } from './../../world/TileMap';
import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tileMap-canvas',
  templateUrl: './tileMap-canvas.component.html',
  styleUrls: ['./tileMap-canvas.component.css']
})
export class TileMapCanvasComponent implements OnInit, OnDestroy {

   private backbufferContext:CanvasRenderingContext2D;

    @ViewChild ('canvas')
    public canvas:ElementRef;

    @ViewChild ('canvas2')
    public canvas2:ElementRef;

    private _tileMap:TileMap;
    private subscribtion:any;
    private forceDrawAll:boolean;

    @Input('tileMap')
    public set tileMap (value:TileMap){
        this._tileMap = value;
        requestAnimationFrame(()=>this.draw());
    }

    private tileSize:number = 25;

    constructor(
        private elementRef:ElementRef,
        private tickService:TickService
    ) { }

    ngOnInit() {
        this.forceDrawAll = true;
        this.subscribtion = this.tickService.draw.subscribe (()=>this.draw ());
    }

    ngOnDestroy () {
        this.subscribtion.unsubscribe ();
    }

    private draw ():void {
        const tiles:Tile[] = this._tileMap.tiles;
        const show1:boolean = this.tickService.ticks % 2 == 0;
        let context:CanvasRenderingContext2D = show1 ? this.canvas.nativeElement.getContext ('2d') : this.canvas2.nativeElement.getContext ('2d'); 
        for(let i:number = 0; i < tiles.length; ++i){
            const tile:Tile = tiles[i];
           // if(tile.changed || this.forceDrawAll){
                const x:number = i % this._tileMap.colCount * this.tileSize;
                const y:number = Math.floor(i / this._tileMap.colCount) * this.tileSize;
                context.fillStyle = this.getBackgroundColor(tile);
                context.fillRect (x, y, this.tileSize, this.tileSize);
            // }
        }
        this.forceDrawAll = false;
        // this.context.drawImage (this.backbufferContext.canvas, 0, 0);
        if(show1){
            this.canvas.nativeElement.style.display = 'block';
            this.canvas2.nativeElement.style.display = 'none';
        }else{
            this.canvas.nativeElement.style.display = 'none';
            this.canvas2.nativeElement.style.display = 'block';
        }
    }

    public getBackgroundColor (tile:Tile):string {
        const perc:number = tile.foodAmount / Tile.MAX_FOOD_AMOUNT;
        switch(tile.type){
            
            case TileType.Water:
                return 'rgb(122,122,255)';  
            

            case TileType.Gras:
            case TileType.Sand:

                return 'rgb('  
                    + '125,'
                    + (150 + perc * 105) + ','
                    + '125)';
            
        }
    }

    public get canvasWidth ():number {
        return this._tileMap.colCount * this.tileSize;
    }

    public get canvasHeight ():number {
        return this._tileMap.rowCount * this.tileSize;
    }

}
