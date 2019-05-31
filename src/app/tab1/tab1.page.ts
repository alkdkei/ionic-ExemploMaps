import { Component } from '@angular/core';

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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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
      'camera': {
        'target': {
          "lat": 21.382314,
          "lng": -157.933097
        },
        'zoom': 10
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
          url: "",
          label: {
            color: "white"
          }
        },
        {
          min: 10,
          url: "",
          label: {
            color: "white"
          }
        }
      ]
    });

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
        "icon": "assets/markercluster/marker.png"
      }
    ]
  }

}
