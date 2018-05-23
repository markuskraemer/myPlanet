import { World } from './../world/World';
import { IStorageDescribtion } from './IStorageDescribtion';
import { Injectable } from '@angular/core';

@Injectable()
export class WorldStorageService {

    private items:IStorageDescribtion[];
    constructor() { }    
    
    public delete (id:string):void {
        this.items = null;
        localStorage.removeItem(id);
        const describtions:IStorageDescribtion [] = this.getFileDescribtions ();
        let index:number = this.getDescribtionIndexById (id, describtions);
        describtions.splice(index, 1);
        localStorage.setItem ('describtions', JSON.stringify(describtions));
    }


    public load (id:string):string {
        const storage:string = localStorage.getItem(id);
        return storage;
    }

    public save (world:World):void {
        const worldJSON:JSON = world.toJSON ();
        console.log("save world ", worldJSON);
        this.updateDescribtion (world);
        localStorage.setItem (world.id, JSON.stringify(worldJSON));
        console.log("saved: ", JSON.parse(localStorage.getItem (world.id)));
    }

    private updateDescribtion (world:World):void {
        this.items = null;
        const describtions:IStorageDescribtion [] = this.getFileDescribtions ();
        let describtion:IStorageDescribtion = this.getDescribtionById (world.id, describtions);
        if(describtion == null){
           describtion = {
               name:world.name,
               id:world.id,
               time:new Date ().getTime ()
            
           } 
           describtions.push(describtion);
        }else{
            describtion.time = new Date ().getTime ();
            describtion.name = world.name;
        }
        localStorage.setItem ('describtions', JSON.stringify(describtions));

        console.log("updatedDescribtions ", this.getFileDescribtions ()); 
    }

    public getFileDescribtions ():IStorageDescribtion[]{
        if(!this.items){
            this.items = JSON.parse (localStorage.getItem ('describtions')) || [];
        }
        return this.items;
    }

    private getDescribtionById (id:string, describtions:IStorageDescribtion[]):IStorageDescribtion {
        return describtions[this.getDescribtionIndexById(id, describtions)];
    }

    private getDescribtionIndexById (id:string, describtions:IStorageDescribtion[]):number {
        const result:number = describtions.findIndex  ((value:IStorageDescribtion) => {
            return value.id == id;
        });
        return result;
    }

}