import { IStorageDescribtion } from './../../storage/IStorageDescribtion';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-storageList',
  templateUrl: './storageList.component.html',
  styleUrls: ['./storageList.component.css']
})
export class StorageListComponent implements OnInit {

    @Input ('items')
    public items:IStorageDescribtion[];

    constructor() { }

    ngOnInit() {
    }

}
