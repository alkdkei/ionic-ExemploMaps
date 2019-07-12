import { Address } from './address';

export class Loja {
    id: string;
    nome: string;
    endereco: Address;
    numero:string;
    complemento:string;
    tel: string;
    lat: number;
    lng: number;
    fotos: string[];
    
}
