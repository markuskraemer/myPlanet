import { MainService } from './../../main.service';
import { Alias } from './../../Alias';
import { WorldStorageService } from './../../storage/world-storage.service';
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
        private storageService:WorldStorageService
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
