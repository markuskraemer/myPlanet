import { TileType } from './TileType.enum';
import { Tile } from './Tile';
export class TileMap {

    public tiles:Tile[] = [];
    public rowCount:number = 0;
    public static readonly TILE_SIZE:number = 50;

    public static fromJSON (json:any):TileMap {

        const tileMap:TileMap = new TileMap ();
        tileMap.rowCount = json['rowCount'];
        const tilesJSON:any[] = json['tiles'];
        for(let i:number = 0; i < tilesJSON.length; ++i){
            tileMap.tiles[i] = Tile.fromJSON (tilesJSON[i]);
        } 
        return tileMap;
    }

    public toJSON ():any {
        return this;
    }

    public createTilesBySeedMap (map:number[][]){
        this.rowCount = map[0].length;
        this.tiles = [];
        for(let col:number = 0; col < map.length; ++col){
            for(let row:number = 0; row < map[col].length; ++row){
                const tile:Tile = new Tile ();
                tile.type = map[col][row];
                if(tile.type == TileType.Water){
                    tile.foodAmount = 0;
                }else if(tile.type == TileType.Sand){
                    tile.foodAmount = 200 + Math.random () * 100;
                }else if(tile.type == TileType.Gras){
                    tile.foodAmount = 500 + Math.random () * 500;
                }
                this.tiles.push(tile);
            }
        }
    }

    public tick ():void {
        for(const tile of this.tiles){
            tile.tick ();
        }
    }

    public getTileAt (x:number, y:number):Tile{

        const r:number = Math.floor(x / TileMap.TILE_SIZE);
        const c:number = Math.floor(y / TileMap.TILE_SIZE);
        const index:number = c * this.rowCount + r;        
        return this.tiles[index];
    }

    public isOnTile (x:number, y:number):boolean {
        return this.getTileAt (x,y) != null;
    }
}
