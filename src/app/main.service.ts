import { Injectable, ApplicationRef } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { Inject } from '@angular/core';
import { Ticker } from './Ticker';
import { Alias } from './Alias';
import { World } from './world/World';
import { Storage } from './storage/Storage';

@Injectable()
export class MainService {

    private ticker:Ticker;
    public world:World;
    
    constructor (
       private storageService:StorageService,
       private appRef:ApplicationRef
        ){
            console.log("SS: ", this.storageService);
        this.init ();
       // this.test ();
        // this.testLoad ();
    }

    private init ():void {
        this.world = new World ();
        Alias.world = this.world;
        this.world.createCreature ();
        this.ticker = new Ticker ();
        this.ticker.tick.subscribe ( (delta:number) => this.tick(delta));
        this.ticker.start ();
    }

    public load (id:string):void {
        const worldJSON:JSON = JSON.parse (this.storageService.load (id));
        this.world = World.fromJSON (worldJSON);
        Alias.world = this.world;
        this.appRef.tick ();
    }
    

    private tick (delta:number){
        this.world.tick (delta);
    }
}