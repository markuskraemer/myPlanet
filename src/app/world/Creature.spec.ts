import { Creature } from './Creature';

describe ('creature test', () => {
    let creature1:Creature;
    beforeAll (() => {
        creature1 = new Creature ();
        creature1.x = 1;
        creature1.y = 2;
        creature1.id = 3;
        creature1.inputFood.input = 4;
        
    })

    it('#creature json test', () => {
        const json1:JSON = creature1.toJSON();
        const creature2:Creature = Creature.fromJSON (json1);
        const json2:JSON = creature2.toJSON();

        console.log("111: ", json1);
        console.log("222: ", json2);

        expect(json2).toEqual(json1);
        
    })
})