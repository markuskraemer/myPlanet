import { TileType } from './../../world/TileType.enum';
import { Component, OnInit, Input } from '@angular/core';
import { Tile } from './../../world/Tile';

@Component({
  selector: 'app-tileMap',
  templateUrl: './tileMap.component.html',
  styleUrls: ['./tileMap.component.css']
})
export class TileMapComponent implements OnInit {

    @Input ('tiles')
    public tiles:Tile[];

    @Input ('rows')
    public rows:number = 0;

    public readonly tileSize:number = 50;

    constructor() { }

    ngOnInit() {
    }

    public getBackgroundColor (tile:Tile):string {
        const perc:number = tile.foodAmount / Tile.MAX_FOOD_AMOUNT;
        switch(tile.type){
            
            case TileType.Water:
                return 'rgb(122,122,255)';  
            
            case TileType.Sand:
                return 'rgb('  
                    + (125 + (perc * 130)) + ','
                    + 183 + ','
                    + 8 + ')';
            
            case TileType.Gras:
                return 'rgb('  
                    + '125,'
                    + (150 + perc * 105) + ','
                    + '125)';
            
        }
    }

}
