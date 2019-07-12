import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  constructor(
    private http: HttpClient
  ) { }

  buscaViaCep(event) {
    let cep: string = event.target.value;
    return this.http.get<Address>('https://viacep.com.br/ws/' + cep + '/json/')
  }

}
