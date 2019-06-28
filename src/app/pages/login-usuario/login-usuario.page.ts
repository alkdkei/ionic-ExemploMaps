import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router/';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {

  protected email: string = "";
  protected pws: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.login();
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        this.router.navigate(["/"]);
        console.log(res);
      },
      err => {
        this.presentAlert("Erro!", "Usuario não encontrado!");
        console.log(err);
      }
    );

  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  //Alertas--------------------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}
