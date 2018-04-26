import { Tile } from './Tile';
export class TileMap {

    public tiles:Tile[] = [];
    public rows:number = 0;

    public createTilesBySeedMap (map:number[][]){
        this.rows = map[0].length;
        this.tiles = [];
        for(let col:number = 0; col < map.length; ++col){
            for(let row:number = 0; row < map[col].length; ++row){
                const tile:Tile = new Tile ();
                tile.foodAmount = map[col][row] * 20;
                this.tiles.push(tile);
            }
        }
    }

    public getTileAt (x:number, y:number):Tile{
        return this.tiles[0];
    }

}
