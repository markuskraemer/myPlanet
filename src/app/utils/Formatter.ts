export class Formatter {

    public static digits:number = 3;
    private static nDigits:number = Math.pow (10, Formatter.digits);

    public static float (f:number):number {
        f *= Formatter.nDigits;
        f |= 0;
        return f / Formatter.nDigits;
    }

}


