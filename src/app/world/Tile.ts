import { Alias } from './../Alias';
import { TileType } from './TileType.enum';
export class Tile {

    public _foodAmount:number = 1;
    public individualMaxFoodAmount:number = 1;
    public staticMaxFoodAmount:number = 1;

    public set foodAmount (value:number){
        if(value != this._foodAmount){
            this._foodAmount = value;
        }
    }

    public get foodAmount ():number {
        return this._foodAmount;
    } 

    public type:TileType;
    private _changed:boolean;

    public toJSON ():any {
        return this;
    }

    public static fromJSON (json:JSON):Tile {
        const tile:Tile = new Tile ();
        tile.foodAmount = json['_foodAmount'];
        tile.individualMaxFoodAmount = json['individualMaxFoodAmount'];
        tile.staticMaxFoodAmount = json['staticMaxFoodAmount'];
        tile.type = json['type'];
        return tile;
    }
    
    public tick ():void {
        this._changed = false;
        if(this.type != TileType.Water){
            this.foodAmount += 6;       
            if(this.foodAmount > this.individualMaxFoodAmount){
                this.foodAmount = this.individualMaxFoodAmount;
            }
        }
    }

    public eat (eatWish:number):number {
        const c:number = Math.min(this.foodAmount, eatWish);
        this.foodAmount -= c;
        return c;
    } 
}
