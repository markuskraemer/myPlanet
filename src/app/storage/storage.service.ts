import { IStorageDescribtion } from './IStorageDescribtion';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor() { }    
    
    public getFileDescribtions ():IStorageDescribtion[]{
        const describtions = JSON.parse (localStorage.getItem ('describtions'));
        return describtions || [];
    }




}