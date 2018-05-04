import { Injectable } from '@angular/core';
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
       private storageService:StorageService
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
    }
    

    private tick (delta:number){
        this.world.tick (delta);
    }
}