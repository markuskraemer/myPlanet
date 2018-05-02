import { StorageService } from './../../storage/storage.service';
import { DialogService } from './../dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

    constructor(
        public dialogService:DialogService,
        public storageService:StorageService
    ) { }

    ngOnInit() {
    }

}
