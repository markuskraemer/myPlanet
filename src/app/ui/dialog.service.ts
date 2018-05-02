import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    private static IDLE:string = 'IDLE'; 
    private static SHOW_STORAGE_LIST:string = 'SHOW_STORAGE_LIST'; 

    constructor() { }

    private state:string = DialogService.IDLE;

    public openStorageList ():void {
        this.state = DialogService.SHOW_STORAGE_LIST;
    }

    public get storageListOpen ():boolean {
        return this.state == DialogService.SHOW_STORAGE_LIST;
    }

}