import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { LojaService } from 'src/app/services/loja.service';
import { Loja } from 'src/app/model/loja';

//GoogleMaps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MyLocation,
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

  protected map: GoogleMap;
  protected loja: Loja;
  protected marker: Marker;

  constructor(
    protected lojaService: LojaService,
    protected alertController: AlertController,
    protected platform: Platform
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
          this.loja = new Loja
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
    this.localAtual();
  }

  localAtual() {
    this.map.getMyLocation()
      .then(
        (location: MyLocation) => {
          this.map.animateCamera({
            target: location.latLng,
            // zoom: 18,
          });
          this.marker = this.map.addMarkerSync({
            title: this.loja.nome,
            snippet: this.loja.endereco,
            icon: '#dd0000',
            animation: 'bouce',
            zoom: 18,
            draggable: false,
            position: location.latLng
          })
          this.loja.lat = location.latLng.lat;
          this.loja.lng = location.latLng.lng;
        });

  }

  addPonto() {
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res => {
        this.marker.setPosition(res[0]);
        this.loja.lat = res[0].lat;
        this.loja.lng = res[0].lng;
        console.log(this.loja);

      }
    )
    this.marker.on(GoogleMapsEvent.MAP_DRAG).subscribe(
      res => {
        this.loja.lat = this.marker.getPosition().lat;
        this.loja.lng = this.marker.getPosition().lng;
        console.log(this.loja);
      }
    )
  }


}


