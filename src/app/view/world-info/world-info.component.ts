import { World } from './../../world/World';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-world-info',
  templateUrl: './world-info.component.html',
  styleUrls: ['./world-info.component.css']
})
export class WorldInfoComponent implements OnInit {

    @Input ('world')
    public world:World;

    constructor() { }

    ngOnInit() {
    }

}
