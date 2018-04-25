import { Ticker } from './Ticker';
import { Alias } from './Alias';
import { World } from './world/World';
import { Storage } from './storage/Storage';
export class Main {

    private ticker:Ticker;
    private storage:Storage;
    public world:World;

    constructor (){
        this.init ();
        this.test ();
        this.testLoad ();
    }

    private init ():void {
        this.storage = new Storage ();
        this.world = new World ();
        Alias.world = this.world;
        this.world.createCreature ();
        this.ticker = new Ticker ();
        this.ticker.tick.subscribe ( (delta:number) => this.tick(delta));
        this.ticker.start ();
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


    public save ():void {
        this.storage.save (this.world.toJSON ());
    }

    private tick (delta:number){
        this.world.tick (delta);
    }

}
