import { World } from './world/World';
import { Storage } from './storage/Storage';
export class Main {

    private storage:Storage;
    private world:World;

    constructor (){
        this.init ();
        this.test ();
        this.testLoad ();
    }

    private test ():void {
        console.log("world: ", this.world);
        this.storage.save (this.world.toJSON ());
        const load:string = this.storage.load ();
        console.log("load: ", load);
    }

    private testLoad ():void {
        const json:JSON = JSON.parse (this.storage.load ());
        const world:World = World.fromJSON (json);
        console.log(" from loaded JSON: ", world, world.toJSON ());
    }

    private init ():void {
        this.storage = new Storage ();
        this.world = new World ();
        this.world.createCreature ();
    }

    public save ():void {
        this.storage.save (this.world.toJSON ());
    }

}
