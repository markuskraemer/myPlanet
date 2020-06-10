import { MainService } from './../../main.service';
import { GenericMapCanvasComponent } from './../generic-map-canvas/generic-map-canvas.component';
import { TickService } from './../../tick.service';
import { TileType } from './../../world/TileType.enum';
import { Tile } from './../../world/Tile';
import { TileMap } from './../../world/TileMap';
import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-tileMap-canvas',
  templateUrl: './tileMap-canvas.component.html',
  styleUrls: ['./tileMap-canvas.component.css']
})
export class TileMapCanvasComponent extends GenericMapCanvasComponent {
 
    private _tileMap:TileMap;
    private forceDraw:boolean;

    @Input('tileMap')
    public set tileMap (value:TileMap) {
        this.forceDraw = true;
        this._tileMap = value;
        requestAnimationFrame(()=>this.draw());
    }

    constructor(
        elementRef:ElementRef,
        tickService:TickService,
        mainService:MainService
    ) { 
        super (elementRef, tickService, mainService);
        this.updateMod = 4;
        window.addEventListener('focus', () => {
            this.forceDraw = true;
        })
    }


    protected doDraw (context:CanvasRenderingContext2D):void{
        for(let i:number = 0; i < this._tileMap.tiles.length; ++i){            
            const tile:Tile = this._tileMap.tiles[i];
            if(this.forceDraw || tile.changed){
                const x:number = i % this._tileMap.colCount * this.tileSize;
                const y:number = Math.floor(i / this._tileMap.colCount) * this.tileSize;
                context.fillStyle = this.getBackgroundColor(tile);
                context.fillRect (x, y, this.tileSize, this.tileSize);
            }
        }
        this.forceDraw = false;
    }

    public getBackgroundColor (tile:Tile):string {
        const perc:number = tile.foodAmount / tile.staticMaxFoodAmount;
        switch(tile.type){
            
            case TileType.Water:
                return 'rgb(72,122,255)';  

           
            case TileType.Gras:
                return 'rgb('                     
                    + (150 + perc * 50) + ','
                    + (150 + perc * 105) + ','
                    + '55)';

             case TileType.Sand:
                 return 'rgb('                     
                    + (150 + perc * 105) + ','
                    + (150 + perc * 105) + ','
                    + '75)';
                    
        }
    }

}
