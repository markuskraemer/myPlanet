import { World } from './../world/World';
import { IStorageDescribtion } from './IStorageDescribtion';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    private items:IStorageDescribtion[];
    constructor() { }    
    
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

    private updateDescribtion (world:World):void{
        this.items = null;
        const describtions:IStorageDescribtion [] = this.getFileDescribtions ();
        let describtion:IStorageDescribtion = this.getDescribtionById (world.id, describtions);
        if(describtion == null){
           describtion = {
               name:"Welt",
               id:world.id,
               time:new Date ().getTime ()
            
           } 
           describtions.push(describtion);
        }else{
            describtion.time = new Date ().getTime ();
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
        for(const describtion of describtions){
            if(describtion.id == id){
                return describtion;
            }
        }
        return null;
    }


}