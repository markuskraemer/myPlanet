import { Creature } from './../../world/Creature';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.css']
})
export class CreatureComponent implements OnInit {

    @Input ('creature')
    public creature:Creature;

    constructor() { }

    ngOnInit() {
    }

    public getInfo (o){
        console.log(o);
    }


}
