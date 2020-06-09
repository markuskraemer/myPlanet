import { DefaultCreatureStorageService } from './../storage/default-creature-storage.service';
import { CreatureStorageService } from './../storage/creature-storage.service';
import { WorldStorageService } from './../storage/world-storage.service';
import { StoredCreaturesComponent } from './stored-creatures/stored-creatures.component';
import { StoredWorldsComponent } from './stored-worlds/stored-worlds.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';


@Injectable()
export class DialogsService {

    constructor( 
        public dialog: MatDialog,
        public worldStorageService:WorldStorageService,
        public creaturesStorageService:CreatureStorageService,
        public defaultCreatureStorageService:DefaultCreatureStorageService 
    ) { }


    public openStoredCreatures (){
        let dialogRef = this.dialog.open(StoredCreaturesComponent, {
            width: '550px',
            data: this.defaultCreatureStorageService.getFileDescribtions ().concat (this.creaturesStorageService.getFileDescribtions())
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }

    public openStoredWorlds (){
        let dialogRef = this.dialog.open(StoredWorldsComponent, {
            width: '550px',
            data: this.worldStorageService.getFileDescribtions()
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }


}