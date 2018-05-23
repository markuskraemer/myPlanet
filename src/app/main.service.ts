import { NeuralNetwork } from './network/NeuralNetwork';
import { Creature } from './world/Creature';
import { TickService } from './tick.service';
import { Injectable, ApplicationRef, NgZone, EventEmitter } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { Inject } from '@angular/core';
import { Alias } from './Alias';
import { World } from './world/World';
import * as Stats from 'stats.js';

@Injectable()
export class MainService {
    private stats:any;
    public world:World;

    public selectCreature (creature:Creature):void {
        console.log("selectCreature: ", creature);
        this.world.inspectedCreature = creature;        
    }

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

        this.stats = new Stats ();
        document.body.appendChild(this.stats.dom);

        this.updateStats ();
    }

    private updateStats ():void {
        this.stats.end ();
        this.stats.begin ();
        requestAnimationFrame(()=>this.updateStats());
    }

    public load (id:string):void {
        const worldJSON:JSON = JSON.parse (this.storageService.load (id));
        this.world = World.fromJSON (worldJSON);
        Alias.world = this.world;
    }
    
    public delete (id:string):void {
        this.storageService.delete (id);
    }

    private tick (delta:number) {
        this.world.tick (delta);
    }
}