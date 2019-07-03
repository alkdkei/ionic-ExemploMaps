import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

import { Usuario } from './../../model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  public usuario: Usuario;

  constructor(
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = new Usuario
  }

  onSubmit(form) {
    this.afAuth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.pws)
      .then(
        res => {
          this.usuario.email = null;
          this.usuario.pws = null;
          this.usuario.uid = res.user.uid
          this.usuarioService.save(this.usuario);
          console.log("Cadastrado");
          this.presentAlert("Aviso!", "Usuário cadastrada.");
          this.router.navigate(['/']);
        }
        ,
        err => {
          console.log("Epá! Não foi cadastrado!" + err);
          this.presentAlert("Erro!", "Epá! Não foi cadastrado!");
        }
      ).catch(
        erros => {
          console.log("Erro ao conectar no sistema! " + erros);
          this.presentAlert("Erro!", "Erro ao conectar no sistema!");
        }
      )
  }


  //Alerts -------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      // subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}
