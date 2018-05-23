import { IStorable } from './IStorable';
import { IStorageDescribtion } from './IStorageDescribtion';
export class GenericStorageService {

    private items:IStorageDescribtion[];
    protected key:string;

    constructor() { }    
    
    public delete (id:string):void {
        this.items = null;
        localStorage.removeItem(id);
        const describtions:IStorageDescribtion [] = this.getFileDescribtions ();
        let index:number = this.getDescribtionIndexById (id, describtions);
        describtions.splice(index, 1);
        localStorage.setItem (this.key, JSON.stringify(describtions));
    }


    public load (id:string):string {
        const storage:string = localStorage.getItem(id);
        return storage;
    }

    public save (o:IStorable):void {
        const oJSON:JSON = o.toJSON ();
        console.log("save: ", oJSON);
        this.updateDescribtion (o);
        localStorage.setItem (o.id, JSON.stringify(oJSON));
        console.log("saved: ", JSON.parse(localStorage.getItem (o.id)));
    }

    private updateDescribtion (o:IStorable):void {
        this.items = null;
        const describtions:IStorageDescribtion [] = this.getFileDescribtions ();
        let describtion:IStorageDescribtion = this.getDescribtionById (o.id, describtions);
        if(describtion == null){
           describtion = {
               name:o.name,
               id:o.id,
               time:new Date ().getTime ()
            
           } 
           describtions.push(describtion);
        }else{
            describtion.time = new Date ().getTime ();
            describtion.name = o.name;
        }
        localStorage.setItem (this.key, JSON.stringify(describtions));

        console.log("updatedDescribtions ", this.getFileDescribtions ()); 
    }

    public getFileDescribtions ():IStorageDescribtion[]{
        if(!this.items){
            this.items = JSON.parse (localStorage.getItem (this.key)) || [];
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
