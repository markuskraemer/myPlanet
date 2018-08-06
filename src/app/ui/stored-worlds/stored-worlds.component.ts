import { IStorageDescribtion } from './../../storage/IStorageDescribtion';
import { FormatterService } from './../../utils/Formatter.service';
import { MainService } from './../../main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-stored-worlds',
  templateUrl: './stored-worlds.component.html',
  styleUrls: ['./stored-worlds.component.css']
})
export class StoredWorldsComponent {

    constructor (
            public dialogRef: MatDialogRef<StoredWorldsComponent>,
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
        this.mainService.loadWorld(item.id);
    }

    public handleDeleteClick(item:IStorageDescribtion):void {
        this.mainService.deleteWorld(item.id);
    } 

}
