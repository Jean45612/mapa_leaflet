import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  private map;

  private initMap(): void {

    var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = '&copy; ' + osmLink;

    var cartoLink = '<a href="http://cartodb.com/attributions">CartoDB</a>';
    var cartoURL = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
    var cartoAttrib = '&copy; ' + osmLink + ' &copy; ' + cartoLink;

    var stamenURL = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}';
    var stamenAttrib = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    var osmMap = L.tileLayer(osmURL, { attribution: osmAttrib });
    var cartoMap = L.tileLayer(cartoURL, { attribution: cartoAttrib });
    var stamenMap = L.tileLayer(stamenURL, {
      attribution: stamenAttrib,
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    });

    this.map = L.map('map', {
      center: [-12.0453, -77.0311],
      zoom: 12,
      layers: [osmMap]
    }).locate({ setView: true, maxZoom: 16 });

    var baseLayers = {
      "Calle": osmMap,
      "Oscuro": cartoMap,
      "Croquis": stamenMap
    };

    L.control.layers(baseLayers).addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
