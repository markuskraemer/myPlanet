import { MainService } from './../../main.service';
import { Alias } from './../../Alias';
import { FormatterService } from './../../utils/Formatter.service';
import { DialogService } from './../dialog.service';
import { IStorageDescribtion } from './../../storage/IStorageDescribtion';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog.js';

@Component({
  selector: 'app-world-storage-list',
  templateUrl: './world-storage-list.component.html',
  styleUrls: ['./world-storage-list.component.css']
})
export class WorldStorageListComponent implements OnInit {

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
        this.mainService.loadWorld(item.id);
    }

    public handleDeleteClick(item:IStorageDescribtion):void {
        this.mainService.deleteWorld(item.id);
    } 

}
