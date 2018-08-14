import { DialogsService } from './ui/dialogs.service';
import { IStorable } from './storage/IStorable';
import { CreatureStorageService } from './storage/creature-storage.service';
import { NeuralNetwork } from './network/NeuralNetwork';
import { Creature } from './world/Creature';
import { TickService } from './tick.service';
import { Injectable, ApplicationRef, EventEmitter } from '@angular/core';
import { WorldStorageService } from './storage/world-storage.service';
import { Inject } from '@angular/core';
import { Alias } from './Alias';
import { World, InspectedCreatuteType } from './world/World';
import * as Stats from 'stats.js';

@Injectable()
export class MainService {
    private stats:any;
    public world:World;

    public selectCreature (creature:Creature):void {
        console.log("selectCreature: ", creature);    
        this.world.customInspectedCreature = creature;
        this.world.inspectedCreatureType = InspectedCreatuteType.custom;
        // this.world.inspectedCreature = creature;
    }

    constructor (
       private worldStorageService:WorldStorageService,
       private creatureStorageService:CreatureStorageService,
       private appRef:ApplicationRef,
       public tickService:TickService
        ){
        this.init ();
    }

    private init ():void {
        this.world = new World ();
        Alias.world = this.world;
        this.world.createMap ();
        this.world.createCreature ();
        this.tickService.tick.subscribe ( (delta:number) => this.tick(delta));
        this.tickService.start ();

        this.stats = new Stats ();
        document.body.appendChild(this.stats.dom);
        this.stats.dom.style.left = 'auto';
        this.stats.dom.style.right = '0';
        this.stats.dom.style.top = 'auto';
        this.stats.dom.style.bottom = '0';
        this.updateStats ();
    }

    private updateStats ():void {
        this.stats.end ();
        this.stats.begin ();
        requestAnimationFrame(()=>this.updateStats());
    }

    public loadWorld (id:string):void {
        const worldJSON:JSON = JSON.parse (this.worldStorageService.load (id));
        this.world = World.fromJSON (worldJSON);
        Alias.world = this.world;
    }

    public loadAndAddCreature (id:string):void {
        const creatureJSON:JSON = JSON.parse(this.creatureStorageService.load(id));
        const creature:Creature = Creature.createFromJSONBrain (creatureJSON);
        this.world.addCreature(creature);
        this.world.setAtRandomPosition(creature);
        this.tickService.emitDraw ();
    }
    
    public deleteWorld (id:string):void {
        this.worldStorageService.delete (id);
    }

    public deleteCreatureStorage (id:string):void {
        this.creatureStorageService.delete(id);
    }

    public saveCurrentInspectedCreature ():void {
        this.creatureStorageService.save (<IStorable> this.world.inspectedCreature);
    }

    private tick (delta:number) {
        this.world.tick (delta);
    }
}