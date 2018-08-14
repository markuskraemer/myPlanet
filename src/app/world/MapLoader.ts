import * as map1 from '../../assets/maps/map1.json';

export class MapLoader {

    public static getMap ():number[]{
        const layers:any[] = map1['layers'];
        return layers[Math.floor(Math.random() * layers.length)].data;
    }
}