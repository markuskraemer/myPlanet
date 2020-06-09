import { Creature } from './../../world/Creature';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-creature-preview',
  templateUrl: './creature-preview.component.html',
  styleUrls: ['./creature-preview.component.css']
})
export class CreaturePreviewComponent implements OnInit {

    @Input ('creature')
    public creature:Creature;

    constructor() { }

    ngOnInit() {
    }

}
