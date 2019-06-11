import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { LojaService } from '../loja.service';
import { Loja } from '../loja';

//GoogleMaps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerCluster
} from '@ionic-native/google-maps';

//Importar suporte para plataforma
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-add-loja',
  templateUrl: './add-loja.page.html',
  styleUrls: ['./add-loja.page.scss'],
})
export class AddLojaPage implements OnInit {

  private map: GoogleMap;
  private loja: Loja;

  constructor(
    private lojaService: LojaService,
    private alertController: AlertController,
    private platform: Platform
  ) { }

  async ngOnInit() {
    this.loja = new Loja;
    await this.platform.ready();
    await this.loadMap();
  }

  onSubmit(form) {
    this.lojaService.save(this.loja)
      .then(
        res => {
          console.log("Cadastrado");
          this.presentAlert("Aviso!", "Loja cadastrada.");
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


  //Googlemaps -----------------------------
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 21.382314,
          lng: -157.933097
        },
        zoom: 15
      }
    });
  }

}
