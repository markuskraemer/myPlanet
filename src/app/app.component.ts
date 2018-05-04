import { MainService } from './main.service';
import { Alias } from './Alias';
import { DialogService } from './ui/dialog.service';
import { Main } from './Main';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor (
        public dialogService:DialogService,
        public mainService:MainService
    ){
    }

}
