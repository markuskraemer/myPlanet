import { Injectable } from '@angular/core';

@Injectable()
export class FormatterService {

    constructor() { }

    public digits:number = 3;
    private nDigits:number = Math.pow (10, this.digits);

    public float (f:number):number {
        f *= this.nDigits;
        f |= 0;
        return f / this.nDigits;
    }

    public toDate (timestamp:number):string {
        const date:Date = new Date (timestamp);
        return date.toLocaleString ();
    }

}