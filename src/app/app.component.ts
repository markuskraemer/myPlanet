import { DialogsService } from './ui/dialogs.service';
import { WorldStorageService } from './storage/world-storage.service';
import { FormatterService } from './utils/Formatter.service';
import { TickService } from './tick.service';
import { MainService } from './main.service';
import { Alias } from './Alias';
import { Component, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public showCreatureUnit:boolean = true;

    constructor (
        public appRef:ApplicationRef,
        public mainService:MainService,
        public tickService:TickService,
        public formatterService:FormatterService,
        public worldStorageService:WorldStorageService,
        public dialogsService:DialogsService
    ){
    }

    public handleInputChange ():void {
        console.log("handleInputChange min|max: " + Alias.world.minCreatureCount + "|" + Alias.world.maxCreatureCount);
        this.appRef.tick ();
    }

    public handleBlurMax (event:Event){
        console.log("handleBlurMax ", event);
        event.target['value'] = Alias.world.maxCreatureCount;
        console.log("now value: " + event.target['value']);
    }

}
