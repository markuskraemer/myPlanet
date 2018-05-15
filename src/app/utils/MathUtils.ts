export class MathUtils {

    public static clampNegPos (n:number):number{
        if(n < -1)
            return -1;

        if(n > 1)
            return 1;

        return n;
    }

    public static clamp01 (n:number):number{
        if(n < 0)
            return 0;
        
        if(n > 1)
            return 1;

        return n;
    }

    public static sigmoid (n:number):number {
        return 1 / (1 + Math.pow(Math.E, -n));
    }

}


