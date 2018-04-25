import { EventEmitter } from '@angular/core';

export class Ticker {

    public tick:EventEmitter<number> = new EventEmitter ();

    private intervalId:any;

    private clearInterval ():void {
        clearInterval(this.intervalId);
    }

    public start ():void {
        this.clearInterval ();
        this.intervalId = setInterval ( () => this.tick.emit (1), 1000);
    }

}
