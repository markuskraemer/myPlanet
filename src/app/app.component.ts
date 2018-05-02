import { DialogService } from './ui/dialog.service';
import { Main } from './Main';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public main:Main;

    constructor (
        public dialogService:DialogService
    ){
        this.main = new Main ();
    }

}
