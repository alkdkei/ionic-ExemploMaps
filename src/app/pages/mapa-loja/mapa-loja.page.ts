import { Component, OnInit } from '@angular/core';

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
  selector: 'app-mapa-loja',
  templateUrl: './mapa-loja.page.html',
  styleUrls: ['./mapa-loja.page.scss'],
})
export class MapaLojaPage implements OnInit {

  map: GoogleMap;

  constructor(
    private platform: Platform
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

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
    return [
      {
        "position": {
          "lat": 21.382314,
          "lng": -157.933097
        },
        "name": "Starbucks - HI - Aiea  03641",
        "address": "Aiea Shopping Center_99-115\nAiea Heights Drive #125_Aiea, Hawaii 96701",
        "icon": "assets/marker.png"
      }
    ]
  }

}
