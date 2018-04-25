export class Storage {

    public save (o:JSON){
        localStorage.setItem ('world', JSON.stringify(o));
    }

    public load ():string{
        return localStorage.getItem('world');
    }

}
