export class Storage {

    public store (o:JSON){
        localStorage.setItem ('world', JSON.stringify(o));
    }

    public get ():string{
        return localStorage.getItem('world');
    }

}
