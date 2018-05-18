import { TickService } from './../../tick.service';
import { TileType } from './../../world/TileType.enum';
import { Tile } from './../../world/Tile';
import { TileMap } from './../../world/TileMap';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-tileMap-canvas',
  templateUrl: './tileMap-canvas.component.html',
  styleUrls: ['./tileMap-canvas.component.css']
})
export class TileMapCanvasComponent implements OnInit {

    @ViewChild ('canvas')
    public canvas:ElementRef;

    private _tileMap:TileMap;
    private subscribtion:any;

    @Input('tileMap')
    public set tileMap (value:TileMap){
        this._tileMap = value;
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

    private determineContext (){
        const canvas:HTMLCanvasElement = this.canvas.nativeElement;
        this.context = canvas.getContext ('2d');        
    }

    private draw ():void {
        const tiles:Tile[] = this._tileMap.tiles;

        for(let i:number = 0; i < tiles.length; ++i){
            const tile:Tile = tiles[i];
            const x:number = i % this._tileMap.colCount * this.tileSize;
            const y:number = Math.floor(i / this._tileMap.colCount) * this.tileSize;
            this.context.fillStyle = this.getBackgroundColor(tile);
            this.context.fillRect (x, y, this.tileSize, this.tileSize);
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
