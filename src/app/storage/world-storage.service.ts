import { GenericStorageService } from './GenericStorageService';
import { World } from './../world/World';
import { IStorageDescribtion } from './IStorageDescribtion';
import { Injectable } from '@angular/core';

@Injectable()
export class WorldStorageService extends GenericStorageService{

    constructor() { 
        super ();
        this.key = 'describtions';
    }    


}