import { FormatterService } from './../../utils/Formatter.service';
import { Creature } from './../../world/Creature';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-creature-info',
  templateUrl: './creature-info.component.html',
  styleUrls: ['./creature-info.component.css']
})
export class CreatureInfoComponent implements OnInit {

    @Input ('creature')
    public creature:Creature;
  
    constructor(
          public formatterService:FormatterService,
    ) { }

    ngOnInit() {
    }

}
