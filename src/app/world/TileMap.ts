import { TileType } from './TileType.enum';
import { Tile } from './Tile';
export class TileMap {

    public tiles:Tile[] = [];
    public rows:number = 0;
    public static readonly TILE_SIZE:number = 50;

    public createTilesBySeedMap (map:number[][]){
        this.rows = map[0].length;
        this.tiles = [];
        for(let col:number = 0; col < map.length; ++col){
            for(let row:number = 0; row < map[col].length; ++row){
                const tile:Tile = new Tile ();
                tile.type = map[col][row];
                if(tile.type == TileType.Water){
                    tile.foodAmount = 0;
                }else if(tile.type == TileType.Sand){
                    tile.foodAmount = 20 + Math.random () * 10;
                }else if(tile.type == TileType.Gras){
                    tile.foodAmount = 50 + Math.random () * 50;
                }
                this.tiles.push(tile);
            }
        }
    }

    public getTileAt (x:number, y:number):Tile{

        const r:number = Math.floor(x / TileMap.TILE_SIZE);
        const c:number = Math.floor(y / TileMap.TILE_SIZE);
        const index:number = r * c + r;
        // console.log(x + "|" + y + " -> " + index);
        return this.tiles[index];
    }

}
