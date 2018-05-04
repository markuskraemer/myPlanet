import { MainService } from './../../main.service';
import { Alias } from './../../Alias';
import { StorageService } from './../../storage/storage.service';
import { DialogService } from './../dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit {

    constructor(
        private mainService:MainService,
        public dialogService:DialogService,
        private storageService:StorageService
    ) { }

    ngOnInit() {
    }

    public handleLoadClick ():void {
        this.dialogService.openStorageList ();
    }

    public handleSaveClick ():void {
        this.storageService.save (this.mainService.world);
    }

}
