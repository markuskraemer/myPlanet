import { DialogService } from './../dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit {

    constructor(
        public dialogService:DialogService
    ) { }

    ngOnInit() {
    }

    public handleLoadClick ():void {
        this.dialogService.openStorageList ();
    }

    public handleSaveClick ():void {
        
    }

}
