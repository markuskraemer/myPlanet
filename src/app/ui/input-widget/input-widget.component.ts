import { Alias } from './../../Alias';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-widget',
  templateUrl: './input-widget.component.html',
  styleUrls: ['./input-widget.component.css']
})
export class InputWidgetComponent implements OnInit {

    private _count:number = Alias.world.maxCreatureCount;

    public set count (value:number) {
        this._count = value;
    }

    public get count ():number {
        return this._count;
    }


    constructor() { }

    ngOnInit() {
    }

    public handleClick ():void {
        Alias.world.setCreatureCountTo (parseInt(String(this.count)));
    }

}
