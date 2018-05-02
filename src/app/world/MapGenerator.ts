import { TileType } from './TileType.enum';

export class MapGenerator {


    public static tileIdCount:number = 3;

    private static getRandomTileId ():TileType {
        return Math.floor(Math.random () * this.tileIdCount);
    }


    private static getRandomTileIdBySeed (seed:number):number {
        const rnd:number = Math.round(Math.random () * this.tileIdCount);
        const roundedSeed:number = Math.round(seed);
        if(roundedSeed == 0 && rnd > .65){
            return roundedSeed;
        }else if(roundedSeed == 1 && rnd > .50){
            return roundedSeed;
        }if(roundedSeed == 2 && rnd > .70){
            return roundedSeed;
        }else{
            return this.getRandomTileId ();
        }
    }

    private static calcNewTileId (map:number[][]):number {
        const currentCol:number[] = map[map.length-1];
        const lastCol:number[] = map[map.length-2];
        const preLastCol:number[] = map[map.length-3];

        const lastOnSameRow:number = (currentCol  && currentCol.length > 1) ? currentCol[currentCol.length-2] : -1;
        const actOnSameRow:number = (currentCol  && currentCol.length > 0) ? currentCol[currentCol.length-1] : -1;
        const actOnSameCol:number = (lastCol && lastCol.length > 1) ? lastCol[Math.max(currentCol.length,0)] : -1;
        const lastOnSameCol:number = (preLastCol && preLastCol.length > 1) ? preLastCol[Math.max(currentCol.length,0)] : -1;

        if(lastOnSameRow != actOnSameRow){
            return actOnSameRow == -1 ? MapGenerator.getRandomTileId () : actOnSameRow;
        }else{
            return MapGenerator.getRandomTileId ();
        }
        /*
        // diese Version sorgt dafür, dass es keine einreihigen inseln gibt:
        const diagonal:number = (lastCol && lastCol.length > 1) ? lastCol[Math.min(currentCol.length+1,currentCol.length-1)] : 0;

        if(lastOnSameRow != actOnSameRow){
            return actOnSameRow == -1 ? MapGenerator.getRandomTileId () : actOnSameRow;
        }else if(lastOnSameCol != actOnSameCol && diagonal == actOnSameCol){
            return actOnSameCol == -1 ? MapGenerator.getRandomTileId () : actOnSameCol;
        }else{
            return MapGenerator.getRandomTileId ();
        }*/

    }


    public static create (width:number, height:number):number[][]{

        const result:number[][] = [[]];

        for(let h:number = 0; h < height; ++h){
            result[h] = [];
            for(let w:number = 0; w < width; ++w){
                result[h][w] =  (this.calcNewTileId(result));
            }
        }        
        return result;
    }


}
