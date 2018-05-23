export interface IStorable {
    name:string;
    id:string;
    toJSON():any;
}