import { Main } from './Main';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public main:Main;

    constructor (){
        this.main = new Main ();
    }

}
