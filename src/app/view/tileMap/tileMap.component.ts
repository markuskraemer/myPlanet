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

    constructor() { }

    ngOnInit() {
    }

    public getBackgroundColor (tile:Tile):string {
        const perc:number = tile.foodAmount / Tile.MAX_FOOD_AMOUNT;
        return 'rgb('  
                    + 0 + ','
                    + perc * 255 + ','
                    + 0 + ')';
    }

}
