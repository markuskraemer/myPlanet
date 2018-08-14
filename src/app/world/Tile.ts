import { Alias } from './../Alias';
import { TileType } from './TileType.enum';
export class Tile {

    public maxFoodAmountFactor:number = 1;
    public _foodAmount:number = 1;

    public set foodAmount (value:number){
        if(value != this._foodAmount){
            this._foodAmount = value;
            this._changed = true;
        }
    }

    public get foodAmount ():number {
        return this._foodAmount;
    } 

    public get changed ():boolean {
        return this._changed;
    } 


    public type:TileType;
    private _changed:boolean;

    public toJSON ():any {
        return this;
    }

    public static fromJSON (json:JSON):Tile {
        const tile:Tile = new Tile ();
        tile.foodAmount = json['_foodAmount'];
        tile.type = json['type'];
        return tile;
    }
    
    public tick ():void {
        this._changed = false;
        if(this.type != TileType.Water){
            this.foodAmount += 6;
            const myMaxFoodAmount:number = Alias.world.maxTileFoodAmount * this.maxFoodAmountFactor;           
            if(this.foodAmount > myMaxFoodAmount){
                this.foodAmount = myMaxFoodAmount;
            }
        }
    }

    public eat (eatWish:number):number {
        const c:number = Math.min(this.foodAmount, eatWish);
        this.foodAmount -= c;
        return c;
    }
}
