import { IStorageDescribtion } from './../../storage/IStorageDescribtion';
import { FormatterService } from './../../utils/Formatter.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-storedItem',
  templateUrl: './storedItem.component.html',
  styleUrls: ['./storedItem.component.css']
})
export class StoredItemComponent implements OnInit {

    @Input ('item')
    public item:IStorageDescribtion;

    constructor(public formatService:FormatterService) { }

    ngOnInit() {
    }

}
