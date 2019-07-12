import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class MensagensService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    public toastController: ToastController,
  ) { }


  //Alertas ----------------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }


  //Loanding ---------------------------------------------
  isLoading = false;
  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      //duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  //Avisos -----------------------------------------------
  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}