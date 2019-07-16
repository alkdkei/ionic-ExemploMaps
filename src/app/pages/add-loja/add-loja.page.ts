import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { LojaService } from 'src/app/services/loja.service';
import { Loja } from 'src/app/model/loja';
import { ViacepService } from 'src/app/services/viacep.service';

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
import { MensagensService } from 'src/app/services/mensagens.service';
import { Address } from 'src/app/model/address';

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
    protected platform: Platform,
    protected msg: MensagensService,
    protected viacepService: ViacepService,

  ) { }

  async ngOnInit() {
    this.loja = new Loja;
    this.loja.endereco = new Address;
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

  //BuscaCEP------------------------
  buscaCep(event) {
    let cep: string = event.target.value;
    console.log(cep);
    if (cep.length > 7) {
      this.msg.presentLoading();
      this.viacepService.buscaViaCep(event)
        .subscribe(
          res => {
            if (res.erro) {
              this.loja.endereco = new Address;
              this.msg.dismiss();
              this.msg.presentToast("Cep não encontrado!");
            } else {
              this.loja.endereco = res;
              this.msg.dismiss();
            }
          },
          err => {
            this.loja.endereco = new Address;
            this.msg.dismiss();
            this.msg.presentToast("Cep invalido!")
          }
        )
    }
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
            snippet: this.loja.endereco.logradouro + " - " + this.loja.endereco.bairro + " - " + this.loja.endereco.localidade,
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


