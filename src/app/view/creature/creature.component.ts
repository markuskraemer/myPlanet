import { FormatterService } from './../../utils/Formatter.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Creature } from './../../world/Creature';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.css']
})
export class CreatureComponent implements OnInit {

    @Input ('creature')
    public creature:Creature;

    public showInfo:boolean = false;

    constructor(
        public formatterService:FormatterService
    ) { }

    ngOnInit() {
    }

    public getInfo (o){
        console.log(o);
    }

    public getBodyWidth ():string {
        return 10 + this.creature.energy * 2 + 'px';
    }

    public getBodyBackgroundColor ():string {
        return 'rgb(' 
                + (255 - this.creature.energy)
                + ', 255, 255)';
    }


}
