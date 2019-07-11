import { Component, OnInit } from '@angular/core';

//GoogleMaps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MyLocation,
  Circle
} from '@ionic-native/google-maps';

//Importar suporte para plataforma
import { Platform } from '@ionic/angular';
import { LojaService } from 'src/app/services/loja.service';

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
          })

          this.map.addMarkerSync({
            //icon: "assets/icon/favicon.png",
            //animation: 'bouce',
            //zoom: 18,
            draggable: false,
            position: location.latLng
          })

          let circle: Circle = this.map.addCircleSync({
            center: location.latLng,
            radius: 150,
            strokeColor: '#AA00FF',
            strokeWidth: 5,
            fillColor: '#00880055'
          });

          this.map.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
            let marker: Marker = params[1];
            //marker.setTitle(marker.get("name"));
            //marker.setSnippet(marker.get("address"));
            marker.showInfoWindow();
          });

          // this.map.addMarkerCluster({
          //   //maxZoomLevel: 5,
          //   boundsDraw: true,
          //   markers: this.lojas,
          //   icons: [
          //     { min: 2, max: 100, url: "assets/marker.png", anchor: { x: 16, y: 16 } },
          //     { min: 100, max: 1000, url: "assets/marker.png", anchor: { x: 16, y: 16 } },
          //   ]
          // });

          this.marcalojas();
        }
      )
  }

  marcalojas() {
    this.lojaService.getAll().subscribe(
      res => {
        res.forEach(loja => {
          this.map.addMarker({
            position: {
              lat: loja.lat,
              lng: loja.lng
            },
            title: loja.nome,
            snippet: loja.endereco,
            icon: "#556677",
          })
        })
      });

  }

}
