import { Component, OnInit } from '@angular/core';

//GoogleMaps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerCluster,
  MyLocation
} from '@ionic-native/google-maps';

//Importar suporte para plataforma
import { Platform } from '@ionic/angular';
import { LojaService } from 'src/app/services/loja.service';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-mapa-loja',
  templateUrl: './mapa-loja.page.html',
  styleUrls: ['./mapa-loja.page.scss'],
})
export class MapaLojaPage implements OnInit {

  map: GoogleMap;

  constructor(
    private platform: Platform,
    private lojaService: LojaService
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.map.getMyLocation()
      .then(
        (location: MyLocation) => {
          this.map.animateCamera({
            target: location.latLng,
            zoom: 18,
          });
        })
    this.addCluster(this.dummyData());
  }

  addCluster(data) {
    let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [
        {
          min: 3,
          max: 9,
          url: "assets/small.png",
          label: {
            color: "white"
          }
        },
        {
          min: 10,
          url: "assets/large.png",
          label: {
            color: "white"
          }
        }
      ]
    });

    markerCluster.off();

    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
      let marker: Marker = params[1];
      marker.setTitle(marker.get("name"));
      marker.setSnippet(marker.get("address"));
      marker.showInfoWindow();
    });

  }

  dummyData() {
    let lojas: any[];
    this.lojaService.getAll().subscribe(
      res => {
        res.forEach(loja => {
          lojas.push({
            "position": {
              "lat": loja.lat,
              "lng": loja.lng
            },
            "name": loja.nome,
            "address": loja.endereco,
            "icon": "assets/marker.png"
          })
        });
      }
    )
    console.log(lojas);    
    return lojas;
  }

}
