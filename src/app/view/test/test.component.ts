import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {

    private _obj:any;

    @Input ('obj')
    public set obj (o:any){
        console.log("set obj: ", o);
        this._obj = o;
    }

    public get obj ():any{
        return this._obj;
    }

    constructor(
        private changeDetectorRef:ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.obj.changed.subscribe (()=>{
            console.log("chnaged");
           // this.changeDetectorRef.markForCheck ();
        })
    }

}
