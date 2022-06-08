import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

const maxBarValue = 0;

// Codice per forzare l'utilizzo del marker
const defaultIconUrl = 'assets/maps/icons/rocketman.png';
const disabledIconUrl = 'assets/maps/icons/flagdisabled_lightgray.png';
const passedIconUrl = 'assets/maps/icons/flag.png';

var defaultIcon  = createCustomIcon(defaultIconUrl, 15, 50);
var disabledIcon = createCustomIcon(disabledIconUrl, 10, 50 );
var passedIcon   = createCustomIcon(passedIconUrl, 25, 50);

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements OnInit, AfterViewInit {

  public score: number = 0;
  // Marker - sono variabili globali per poterle modificare dopo l'inizializzazione della mappa
  private mercuryMark: any;
  private venusMark: any;
  private earthMark: any;
  private marsMark: any;
  private jupiterMark: any;
  private saturnMark: any;
  private uranusMark: any;
  private neptuneMark: any;

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


    var w = 2560;
    var h = 1440;
    var url = '/assets/maps/solar-system.jpg';
    var southWest = this.map.unproject([0, h], this.map.getMaxZoom() - 1);
    var northEast = this.map.unproject([w, 0], this.map.getMaxZoom() - 1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    L.imageOverlay(url, bounds).addTo(this.map);

    this.map.setMaxBounds(bounds);

    //Aggiungo marker stanze    
    var mercury = L.latLng([-200, 486]);
    var venus = L.latLng([-195, 447]);
    var earth = L.latLng([-180, 390]);
    var mars = L.latLng([-165, 323]);
    var jupiter = L.latLng([-160, 243]);
    var saturn = L.latLng([-130, 160]);
    var uranus = L.latLng([-85, 82]);
    var neptune = L.latLng([-45, 30]);

    this.mercuryMark = L.marker(mercury, { icon: defaultIcon }).addTo(this.map);
    this.venusMark = L.marker(venus, { icon: defaultIcon }).addTo(this.map);
    this.earthMark = L.marker(earth, { icon: defaultIcon }).addTo(this.map);
    this.marsMark = L.marker(mars, { icon: defaultIcon }).addTo(this.map);
    this.jupiterMark = L.marker(jupiter, { icon: defaultIcon }).addTo(this.map);
    this.saturnMark = L.marker(saturn, { icon: defaultIcon }).addTo(this.map);
    this.uranusMark = L.marker(uranus, { icon: defaultIcon }).addTo(this.map);
    this.neptuneMark = L.marker(neptune, { icon: defaultIcon }).addTo(this.map);

    //Aggiungo i percorsi fra i marker
    // var travelA = L.polyline([shire, roan]).addTo(this.map);

    this.refreshMarker();
  }

  constructor(http: HttpClient, private router: Router) {

    this.score = 60;
    // http.get<number>(`${environment.api_url}/getScore`).subscribe(result => {
    //   this.score = result;
    //   this.refreshMarker();
    // }, error => console.error(error));
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }

  goToTable() {
    this.router.navigate(['/table']);
  }

  addScore(value: string) {
    alert(value);
    this.refreshMarker();
  }

  refreshMarker() {
    this.manageMarker(this.mercuryMark, 0, 30, () => this.addScore('mercury'));
    this.manageMarker(this.venusMark, 30, 60, () => this.addScore('venus'));
    this.manageMarker(this.earthMark, 40, 70, () => this.addScore('earth'));
    this.manageMarker(this.marsMark, 70, 100, () => this.addScore('mars'));
    this.manageMarker(this.jupiterMark, 70, 100, () => this.addScore('jupiter'));
    this.manageMarker(this.saturnMark, 70, 100, () => this.addScore('saturn'));
    this.manageMarker(this.uranusMark, 70, 100, () => this.addScore('uranus'));
    this.manageMarker(this.neptuneMark, 70, 100, () => this.addScore('neptune'));
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

function createCustomIcon(defaultIconUrl: string, iconAnchorLeft: number, iconAnchorTop: number) {
  return L.icon({
    iconUrl: defaultIconUrl,
    iconSize: [48, 48],
    iconAnchor: [iconAnchorLeft, iconAnchorTop],
    popupAnchor: [0, -50],
    tooltipAnchor: [25, -28]
  });
}

function getMarkerIcon(value: number, disabledLimit: number, passedLimit: number): L.Icon {
  if (value < disabledLimit)
    return disabledIcon;

  if (value >= passedLimit)
    return passedIcon;

  return defaultIcon;
}

function isMarkerDisabled(marker: L.Marker): boolean {
  return marker.getIcon().options['iconUrl'] == disabledIconUrl;
}