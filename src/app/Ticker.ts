import { EventEmitter } from '@angular/core';

export class Ticker {

    private _ticks:number = 0;
    private intervalId:any;

    public tick:EventEmitter<number> = new EventEmitter ();

    public get ticks ():number {
        return this._ticks;
    }

    private clearInterval ():void {
        clearInterval(this.intervalId);
    }

    public start ():void {
        this.clearInterval ();
        this.intervalId = setInterval ( () => {
            this._ticks ++;
            this.tick.emit (1);
        }, 1000);
    }
}
