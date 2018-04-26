import { World } from './World';

describe ('world test', () => {
    let world1:World;
    beforeAll (() => {
        world1 = new World ();
        world1.createCreature ();        
    })

    it('#world: toJSON equals fromJSON', () => {
        const json1:JSON = world1.toJSON();
        const world2:World = World.fromJSON (json1);
        const json2:JSON = world2.toJSON();

        console.log("111: ", json1);
        console.log("222: ", json2);

        expect(json2).toEqual(json1);
        
    })

})