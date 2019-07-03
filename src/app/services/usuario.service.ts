import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Usuario } from './../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private bd: AngularFireDatabase
  ) { }

  save(usuario: Usuario) {
    return this.bd.list("usuarios").push(usuario);
  }

  getAll() {
    return this.bd.list<Usuario>("usuarios").snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

}
