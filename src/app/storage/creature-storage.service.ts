import { GenericStorageService } from './GenericStorageService';
import { Creature } from './../world/Creature';
import { Injectable } from '@angular/core';

@Injectable()
export class CreatureStorageService extends GenericStorageService {

    constructor( ) {
        super ();
        this.key = 'creatures';
     }

}