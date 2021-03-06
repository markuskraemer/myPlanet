import { DialogsService } from './ui/dialogs.service';
import { WorldStorageService } from './storage/world-storage.service';
import { FormatterService } from './utils/Formatter.service';
import { TickService } from './tick.service';
import { MainService } from './main.service';
import { Alias } from './Alias';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public showCreatureUnit:boolean = false;

    constructor (
        public mainService:MainService,
        public tickService:TickService,
        public formatterService:FormatterService,
        public worldStorageService:WorldStorageService,
        public dialogsService:DialogsService
    ){
    }

}
