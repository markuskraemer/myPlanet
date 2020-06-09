import { Alias } from './../Alias';
import { TileType } from './TileType.enum';
export class Tile {

    public _foodAmount:number = 1;
    public individualMaxFoodAmount:number = 1;
    public staticMaxFoodAmount:number = 1;
    public changed:boolean = true;

    public set foodAmount (value:number){
        if(value != this._foodAmount){
            this._foodAmount = value;
            this.changed = true;
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
        this.changed = false;
        if(this.type != TileType.Water){
            if(this.foodAmount < this.individualMaxFoodAmount){
                this.foodAmount += 6;       
                if(this.foodAmount > this.individualMaxFoodAmount){
                    this.foodAmount = this.individualMaxFoodAmount;
                }
                this.changed = true;
            }
        }
    }

    public eat (eatWish:number):number {
        const c:number = Math.min(this.foodAmount, eatWish);
        if(c != 0)
            this.changed = true;
        this.foodAmount -= c;
        return c;
    } 
}
