import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';


const maxBarValue = 100;

// Codice per forzare l'utilizzo del marker
const defaultIconUrl  = 'assets/maps/icons/default-marker-icon.png';
const disabledIconUrl = 'assets/maps/icons/disabled-marker-icon.png';
const passedIconUrl   = 'assets/maps/icons/passed-king-marker-icon.png';
const shadowUrl       = 'assets/maps/icons/marker-shadow.png';

var defaultIcon  = createCustomIcon(defaultIconUrl);
var disabledIcon = createCustomIcon(disabledIconUrl);
var passedIcon   = createCustomIcon(passedIconUrl);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  
  public score : number = 0;

  // Marker - sono variabili globali per poterle modificare dopo l'inizializzazione della mappa
  private shireMark  : any;
  private roanMark   : any;
  private gondorMark : any;
  private doomMark   : any;

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
    var roan    = L.latLng([-235, 410]);
    var gondor  = L.latLng([-285, 410]);

    this.shireMark  = L.marker(shire, {icon: defaultIcon}) .addTo(this.map).bindPopup('The Shire');
    this.roanMark   = L.marker(roan, {icon: defaultIcon})  .addTo(this.map).bindPopup('Roan');
    this.gondorMark = L.marker(gondor, {icon: defaultIcon}).addTo(this.map).bindPopup('Gondor');
    this.doomMark   = L.marker(doom, {icon: defaultIcon})  .addTo(this.map).bindPopup('Monte Fato');

    //Aggiungo i percorsi fra i marker
    var travelA = L.polyline([shire, roan]).addTo(this.map);
    var travelB = L.polyline([shire, gondor]).addTo(this.map);
    var travelC = L.polyline([roan, doom]).addTo(this.map);
    var travelD = L.polyline([gondor, doom]).addTo(this.map);

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

  constructor(http: HttpClient, private router: Router) {
    
    http.get<number>(`${environment.api_url}/getScore`).subscribe(result => {
      this.score = result;
      this.refreshMarker();
    }, error => console.error(error));
   }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }

  goToTable() {
    this.router.navigate([ '/table' ]);
  }

  addScore(value: number) {
    this.score = this.score + value;

    if(this.score > maxBarValue) this.score = maxBarValue;
    
    this.refreshMarker();
  }

  addScoreNp() {
    console.log('ADD: 8');
    this.score = this.score + 8;

    if(this.score > maxBarValue) this.score = maxBarValue;
    
    this.refreshMarker();
  }
  
  resetScore() {
    this.score = 0;
    this.refreshMarker();

  }

  refreshMarker() {
    //Shire
    this.manageMarker(this.shireMark, 0, 30, () => this.addScore(5));

    //Roan
    this.manageMarker(this.roanMark, 30, 60, () => this.addScore(10));
    
    //Gondor
    this.manageMarker(this.gondorMark, 40, 70, () => this.addScore(20));
    
    //Roan
    this.manageMarker(this.doomMark, 70, 100, () => this.goToTable());
  }
  
  // Ad ogni modifica dello score cambio il marker
  private manageMarker(marker: L.Marker, disabledLimit: number, passedLimit: number, onClickFunction: Function) {

    // Prima lo rimuovo dalla mappa
    this.map.removeLayer(marker);

    // Cambio l'icona in base allo score
    marker.setIcon(getMarkerIcon(this.score, disabledLimit, passedLimit));

    // Rimuovo tutti gli event listner a priori
    marker.off('click');

    // Se non disabilitato allora aggiungo il parametro passato
    if (!isMarkerDisabled(marker))
      marker.on('click', () => onClickFunction());
      
    // Infine lo riaggiungo alla mappa
    this.map.addLayer(marker);
  }
}

function createCustomIcon(defaultIconUrl: string) {
 return L.icon({
  iconUrl:       defaultIconUrl,
  shadowUrl:     shadowUrl,
  iconSize:      [50, 50],
  iconAnchor:    [25, 50],
  shadowSize:    [41, 41],
  shadowAnchor:  [10, 41],
  popupAnchor:   [0, -50],
  tooltipAnchor: [25, -28]
});
}

function getMarkerIcon(value: number, disabledLimit: number, passedLimit: number ) : L.Icon
{
  if(value < disabledLimit)
    return disabledIcon;

  if(value >= passedLimit)
    return passedIcon;

  return defaultIcon;
}

function isMarkerDisabled(marker: L.Marker) : boolean
{
  return marker.getIcon().options['iconUrl'] == disabledIconUrl;
}