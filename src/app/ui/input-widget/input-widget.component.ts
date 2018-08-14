import { Alias } from './../../Alias';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-widget',
  templateUrl: './input-widget.component.html',
  styleUrls: ['./input-widget.component.css']
})
export class InputWidgetComponent implements OnInit {

    public count:number = 1000;

    constructor() { }

    ngOnInit() {
    }

    public handleClick ():void {
        Alias.world.setCreatureCountTo (parseInt(String(this.count)));
    }

}
