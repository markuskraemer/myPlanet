import { IStorable } from './IStorable';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultWorldStorageService {

    constructor() { }

   public getFileDescribtions ():any[] {

        const o = '{"_energy":141.74830698963723,"_recordHistory":true,"name":"any creature","width":10,"height":10,"viewAngle":-0.7550916204285674,"age":2.600000000000001,"generation":0,"isDead":false,"childCount":0,"moveVector":{"x":-0.6961665151462441,"y":0.7396958680167582},"id":"25","color":{"model":"rgb","color":[122.08729042465995,95.91631004305681,34.51603241809097],"valpha":1},"_brain":{"_inputLayer":[{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},{"id":"IN_AGE","bias":0,"_input":0.2500000000000001}],"_outputLayer":[{"id":"OUT_EAT","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.09044066134183959},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":0.3922244774477668},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":-0.7282593297722948}]},{"id":"OUT_ROTATE","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.7452575662336369},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":-0.8063668868047227},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":0.6213932858970534}]},{"id":"OUT_MOVE","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.6334039012451407},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":-0.10084952384472379},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":-0.021268874906522406}]},{"id":"OUT_GIVE_BIRTH","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.6155512939364876},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":0.6799954418017773},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":-0.3964858543428309}]}]},"inputFood":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"inputEnergy":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"inputAge":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"outEat":{"id":"OUT_EAT","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.09044066134183959},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":0.3922244774477668},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":-0.7282593297722948}]},"outRotate":{"id":"OUT_ROTATE","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.7452575662336369},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":-0.8063668868047227},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":0.6213932858970534}]},"outMove":{"id":"OUT_MOVE","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.6334039012451407},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":-0.10084952384472379},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":-0.021268874906522406}]},"outGiveBirth":{"id":"OUT_GIVE_BIRTH","bias":0,"connections":[{"fromNeuron":{"id":"IN_FOOD","bias":0,"_input":0.7990191476750287},"weight":0.6155512939364876},{"fromNeuron":{"id":"IN_ENERGY","bias":0,"_input":0.8799493398792402},"weight":0.6799954418017773},{"fromNeuron":{"id":"IN_AGE","bias":0,"_input":0.2500000000000001},"weight":-0.3964858543428309}]},"x":371.5717682365227,"y":347.088107833859,"tile":{"_foodAmount":396.57078382724256,"individualMaxFoodAmount":399.5095738375143,"staticMaxFoodAmount":500,"type":1,"_changed":false}}';
        
        return [{
            name:"very good creature",
                "time":1534752335132,
                "o":o
        }];

   }

   
}