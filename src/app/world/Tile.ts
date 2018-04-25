export class Tile {

    public foodAmount:number = 1;

    public toJSON ():any {
        const { foodAmount } = this;
        return { foodAmount };
    }

    public static fromJSON (json:JSON):Tile {
        const tile:Tile = new Tile ();
        tile.foodAmount = json['foodAmount'];
        return tile;
    }
    
}
