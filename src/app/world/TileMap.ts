import { Tile } from './Tile';
export class TileMap {

    public tiles:Tile[] = [];

    public getTileAt (x:number, y:number):Tile{
        return this.tiles[0];
    }

}
