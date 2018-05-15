import { NeuralNetwork } from './network/NeuralNetwork';
import { Creature } from './world/Creature';
import { TickService } from './tick.service';
import { Injectable, ApplicationRef, NgZone, EventEmitter } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { Inject } from '@angular/core';
import { Alias } from './Alias';
import { World } from './world/World';
import { Storage } from './storage/Storage';

@Injectable()
export class MainService {

    public world:World;
    public _inspectedCreature:Creature;
    public set  inspectedCreature(creature:Creature){
        this._inspectedCreature = creature;
        this.inspectedCreatureBrain = creature ? creature.brain : null;
    }

    public get inspectedCreature ():Creature {
        return this._inspectedCreature;
    }

    public inspectedCreatureBrain:NeuralNetwork;
        
    public testObject = {count:0, changed: new EventEmitter ()}; 

    constructor (
       private storageService:StorageService,
       private appRef:ApplicationRef,
       private zone:NgZone,
       public tickService:TickService
        ){
        this.init ();
    }

    private init ():void {
        this.world = new World ();
        Alias.world = this.world;
        this.world.createCreature ();
        this.tickService.tick.subscribe ( (delta:number) => this.tick(delta));
        this.tickService.start ();
    }

    public load (id:string):void {
        const worldJSON:JSON = JSON.parse (this.storageService.load (id));
        this.world = World.fromJSON (worldJSON);
        Alias.world = this.world;
    }
    
    public delete (id:string):void {
        this.storageService.delete (id);
    }


    private tick (delta:number){
        this.world.tick (delta);
        this.testObject.count ++;
        this.testObject.changed.emit ();
        // this.zone.run (() => console.log("run"));
    }
}