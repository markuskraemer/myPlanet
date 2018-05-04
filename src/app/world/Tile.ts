import { TileType } from './TileType.enum';
export class Tile {

    public static MAX_FOOD_AMOUNT:number = 100;

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
    
    public eat (eatWish:number):number {
        const c:number = Math.min(this.foodAmount, eatWish);
        this.foodAmount -= c;
        return c;
    }
}
