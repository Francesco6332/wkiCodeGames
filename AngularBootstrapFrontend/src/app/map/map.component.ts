import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  // Creo e inizializzo la mappa con Leaflet
  private map: any;  
  private initMap(): void {

    // Esempio con mappa custom
    this.map = L.map('map', {
      minZoom: 0,
      maxZoom: 3,
      center: [0, 0],
      zoom: 1,
      crs: L.CRS.Simple
    });

    
    var w = 3000;
    var h = 1713;
    var url = '/assets/maps/815670.jpg';
    var southWest = this.map.unproject([ 0, h], this.map.getMaxZoom()-1);
    var northEast = this.map.unproject([ w, 0], this.map.getMaxZoom()-1);
    var bounds = new L.LatLngBounds( southWest, northEast);

    L.imageOverlay( url, bounds).addTo(this.map);

    this.map.setMaxBounds(bounds);

    //Aggiungo marker stanze
    var shire   = L.latLng([-120, 275.0]);
    var doom    = L.latLng([ -250, 530]);
    var roan  = L.latLng([-235, 410]);
    var gondor  = L.latLng([-285, 410]);
    
    L.marker(shire).on('click', (clickEvent) => openPopup('Shire')).addTo(this.map).bindPopup('The Shire');
    L.marker(doom).addTo(this.map).bindPopup('Monte Fato');
    L.marker(roan).addTo(this.map).bindPopup('Roan');
    L.marker(gondor).addTo(this.map).bindPopup('Gondot');

    // var travel = L.polyline([sol, deneb]).addTo(this.map);


    // Esempio con openstreetmap 
    // this.map = L.map('map', {
    //   center: [ 39.8282, -98.5795 ],
    //   zoom: 3
    // });
    
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });
    
    // tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }
  

  
}

function openPopup(place: string) {
  alert("Welcome to " + place);
}

