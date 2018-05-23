import { FormatterService } from './../../utils/Formatter.service';
import { DialogService } from './../dialog.service';
import { MainService } from './../../main.service';
import { IStorageDescribtion } from './../../storage/IStorageDescribtion';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog.js';

@Component({
  selector: 'app-creatures-storage-list',
  templateUrl: './creatures-storage-list.component.html',
  styleUrls: ['./creatures-storage-list.component.css']
})
export class CreaturesStorageListComponent implements OnInit {

    @Input ('items')
    public items:IStorageDescribtion[];

    @ViewChild ('dialog')
    private dialog:ElementRef;

    constructor(
        private mainService:MainService,
        private dialogService:DialogService,
        public formatterService:FormatterService
    ) { }

    ngOnInit() {
        $(this.dialog.nativeElement).dialog ({
            close: () => this.dialogService.closeStorageList (),
            width:500
        })
    }

    public handleLoadClick (item:IStorageDescribtion):void {
        this.mainService.loadAndAddCreature(item.id);
    }

    public handleDeleteClick(item:IStorageDescribtion):void {
        this.mainService.deleteCreatureStorage(item.id);
    } 
}
