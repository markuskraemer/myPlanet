import { MainService } from './../../main.service';
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
        public formatterService:FormatterService,
        public mainService:MainService
    ) { }

    ngOnInit() {
    }

    public getInfo (o){
        console.log(o);
    }

    public getCreatureBackgroundColor ():string {
        return 'rgb(' 
                + (255 - this.creature.energy)
                + ', 255, 255)';
    }

    public getCreatureTransform ():string {
        const scale:number = 1 + Math.max(this.creature.energy, 0) / 500;
        return 'scale(' + scale + ')rotateZ(' + this.creature.viewAngle + 'rad)';
    }

    public getCreatureStyle ():any {
        let o:any = {
            backgroundColor:this.creature.color.rgb().string(),
            transform:this.getCreatureTransform()
        }
        return o;
    }


}
