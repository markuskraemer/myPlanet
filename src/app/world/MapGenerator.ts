
export class MapGenerator {


    public static tileIdCount:number = 3;

    private static getRandomTileId (seed:number = undefined):number {
        if(seed == undefined){
            return Math.floor(Math.random () * this.tileIdCount);
        }else{
            const rnd:number = Math.round(Math.random () * this.tileIdCount);
            const roundedSeed:number = Math.round(seed);
            if(roundedSeed == 0 && rnd > .65){
                return Math.round(roundedSeed);
            }else if(roundedSeed == 1 && rnd > .50){
                return Math.round(roundedSeed);
            }if(roundedSeed == 2 && rnd > .80){
                return Math.round(roundedSeed);
            }else{
                return this.getRandomTileId ();
            }
        }
    }

    private static calcNewTileId (map:number[][]):number {        
        const currentCol:number[] = map[map.length-1];
        const lastCol:number[] = map[map.length-2];

        const actOnSameRow:number = (currentCol  && currentCol.length > 0) ? currentCol[currentCol.length-1] : MapGenerator.getRandomTileId ();
        const actOnSameCol:number = (lastCol && lastCol.length > 0) ? lastCol[Math.max(currentCol.length-1,0)] : actOnSameRow;

        const av:number = (actOnSameRow + actOnSameCol) / 2;
        return this.getRandomTileId (av);
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
