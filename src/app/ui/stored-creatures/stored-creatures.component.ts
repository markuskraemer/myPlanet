import { Creature } from './../../world/Creature';
import { InspectedCreatuteType } from './../../world/World';
import { IStorageDescribtion } from './../../storage/IStorageDescribtion';
import { FormatterService } from './../../utils/Formatter.service';
import { MainService } from './../../main.service';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-stored-creatures',
  templateUrl: './stored-creatures.component.html',
  styleUrls: ['./stored-creatures.component.css']
})
export class StoredCreaturesComponent  {

    constructor (
            public dialogRef: MatDialogRef<StoredCreaturesComponent>,
            private mainService:MainService,
            public formatterService:FormatterService,
             @Inject (MAT_DIALOG_DATA) public data: IStorageDescribtion[]
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public handleOKClick():void {
        this.dialogRef.close();        
    }

    public handleLoadClick (item:IStorageDescribtion):void {
        this.mainService.loadAndAddCreature(item.id);
    }

    public handleDeleteClick(item:IStorageDescribtion):void {
        this.mainService.deleteCreatureStorage(item.id);
    } 

    public handlePreviewClick (jsonString:string) {
        this.mainService.world.inspectedCreatureType = InspectedCreatuteType.custom;
        this.mainService.world.inspectedCreature = this.getCreature(jsonString);
    }

    public getCreature (jsonString:string){
        return Creature.fromJSON (JSON.parse(jsonString));
    }
}
