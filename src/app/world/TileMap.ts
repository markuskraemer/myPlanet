import { Alias } from './../Alias';
import { TileType } from './TileType.enum';
import { Tile } from './Tile';
export class TileMap {

    public tiles:Tile[] = [];
    public rowCount:number = 0;
    public colCount:number = 0;
    public static readonly TILE_SIZE:number = 20;

    public static fromJSON (json:any):TileMap {

        const tileMap:TileMap = new TileMap ();
        tileMap.rowCount = json['rowCount'];
        tileMap.colCount = json['colCount'];
        const tilesJSON:any[] = json['tiles'];
      
        for(let i:number = 0; i < tilesJSON.length; ++i){
            tileMap.tiles[i] = Tile.fromJSON (tilesJSON[i]);
        } 
        return tileMap;
    }

    public toJSON ():any {
        return this;
    }

    public createTilesBySeedMap1d (map:number[], rowCount:number){
        this.rowCount = rowCount;
        this.colCount = Math.floor(map.length / rowCount);
        this.tiles = [];
        this.createTiles (map);
        this.setFoodAmount ();
        this.setFoodAmountIfWaterNeighbour ();
    }

    private createTiles (map:number[]) {
        for(let i:number = 0; i < map.length; ++i){
            const tile:Tile = new Tile ();
            tile.type = map[i];
            this.tiles.push(tile);
        }        
    }

    private setFoodAmount ():void {
        for(let i:number = 0; i < this.tiles.length; ++i){
            const tile:Tile = this.tiles[i];                
            if(tile.type == TileType.Water){
                tile.foodAmount = 0;
            }else if(tile.type == TileType.Sand){
                tile.foodAmount = Alias.world.maxTileFoodAmount * .2 + Math.random () * Alias.world.maxTileFoodAmount * .1;
                tile.maxFoodAmountFactor = Math.random () * .2 + .8;
            }else if(tile.type == TileType.Gras || tile.type == TileType.None){
                tile.foodAmount = Alias.world.maxTileFoodAmount * .5 + Math.random () * Alias.world.maxTileFoodAmount * .5;
                tile.maxFoodAmountFactor = Math.random () * .2 + .8;
            }
        }
    }

    private getCol (index:number):number {
        return Math.floor(index / this.rowCount);
    }

    private getRow (index:number):number {
        return index % this.colCount;
    }


    private setFoodAmountIfWaterNeighbour ():void {
        for(let i:number = 0; i < this.tiles.length; ++i){
            const tile:Tile = this.tiles[i];
            if(tile.type == TileType.Water){
                continue;
            } 
            const r:number = this.getRow (i);
            const c:number = this.getCol (i);
            
            const left:Tile = this.getTileAtRC (r-1, c);
            const right:Tile = this.getTileAtRC (r+1, c);
            const top:Tile = this.getTileAtRC (r, c-1);
            const bottom:Tile = this.getTileAtRC (r, c+1);
            if(
                   (left && left.type == TileType.Water) 
                || (right && right.type == TileType.Water) 
                || (top && top.type == TileType.Water) 
                || (bottom && bottom.type == TileType.Water)
                ) 
            {
                tile.maxFoodAmountFactor *= .5;
            }else{
                const leftTop:Tile = this.getTileAtRC (r-1, c-1);
                const rightTop:Tile = this.getTileAtRC (r+1, c-1);
                const leftBottom:Tile = this.getTileAtRC (r-1, c+1);
                const rightBottom:Tile = this.getTileAtRC (r+1, c+1);
            if(
                      (leftTop && leftTop.type == TileType.Water) 
                   || (rightTop && rightTop.type == TileType.Water)
                   || (leftBottom && leftBottom.type == TileType.Water)
                   || (rightBottom && rightBottom.type == TileType.Water)
                ){
                    tile.maxFoodAmountFactor *= .75;
                }
            }            
        }              
    }

    public tick ():void {
        for(const tile of this.tiles){
            tile.tick ();
        }
    }

    public getTileAtXY (x:number, y:number):Tile{

        const r:number = Math.floor(x / TileMap.TILE_SIZE);
        const c:number = Math.floor(y / TileMap.TILE_SIZE);
        return this.getTileAtRC (r, c);        
    }

    private getTileAtRC (r:number, c:number):Tile {
        if(r < 0 || r >= this.rowCount || c < 0 || c >= this.colCount)
            return null;

        const index:number = c * this.rowCount + r;        
        return this.tiles[index];
    }

    public isOnTile (x:number, y:number):boolean {
        return this.getTileAtXY (x,y) != null;
    }
}
