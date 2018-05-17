import { TileType } from './TileType.enum';
export class Tile {

    public static readonly MAX_FOOD_AMOUNT:number = 1000;

    public foodAmount:number = 1;
    public type:TileType;
    
    public toJSON ():any {
        return this;
    }

    public static fromJSON (json:JSON):Tile {
        const tile:Tile = new Tile ();
        tile.foodAmount = json['foodAmount'];
        tile.type = json['type'];
        return tile;
    }
    
    public tick ():void {
        if(this.type != TileType.Water){
            this.foodAmount += 10;
            if(this.foodAmount > Tile.MAX_FOOD_AMOUNT)
                this.foodAmount = Tile.MAX_FOOD_AMOUNT;
        }
    }

    public eat (eatWish:number):number {
        const c:number = Math.min(this.foodAmount, eatWish);
        this.foodAmount -= c;
        return c;
    }
}
