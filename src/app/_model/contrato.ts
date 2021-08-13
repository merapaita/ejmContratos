import { Promotor } from './promotor';
import { Detitecon } from './detItecon';

export class Contrato {
    idContrato?: number;
    tipcon: string;
    codcon: string;
    fecha: string;
    promotor: Promotor;
    inscripcion:number;
    mtotot?:number;
    cuota:number;
    numcuotas?:number;
    estado?:string;
    detitecon:Detitecon[];
}