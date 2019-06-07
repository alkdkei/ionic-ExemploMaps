import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Loja } from './loja';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(
    private bd: AngularFireDatabase
  ) { }

  save(loja: Loja) {
    return this.bd.list("lojas").push(loja);
  }

  getAll() {
    return this.bd.list("lojas").snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

}
