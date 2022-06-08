import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

const maxBarValue = 0;

// Codice per forzare l'utilizzo del marker
const surveyUrl   = 'assets/maps/icons/survey.png';
const feedbackUrl = 'assets/maps/icons/feedback.png';
const trainigUrl  = 'assets/maps/icons/training.png';

var surveyIcon     = createCustomIcon(surveyUrl  , 15, 50);
var feedbackIcon   = createCustomIcon(feedbackUrl, 10, 50);
var trainigIcon    = createCustomIcon(trainigUrl , 25, 50);

@Component({
  selector: 'app-mercury-map',
  templateUrl: './mercury-map.component.html',
  styleUrls: ['./mercury-map.component.css']
})
export class MercuryMapComponent implements OnInit,  AfterViewInit {

  public score: number = 0;
  // Marker - sono variabili globali per poterle modificare dopo l'inizializzazione della mappa
  private surveyMark: any;
  private feedbackMark: any;
  private trainigMark: any;

  // Creo e inizializzo la mappa con Leaflet
  private map: any;
  private initMap(): void {

    // Esempio con mappa custom
    this.map = L.map('map-mercury', {
      minZoom: 1,
      maxZoom: 3,
      center: [0, 0],
      zoom: 2,
      crs: L.CRS.Simple
    });


    var w = 1032;
    var h = 1038;
    var url = '/assets/maps/mercury.jpg';
    var southWest = this.map.unproject([0, h], this.map.getMaxZoom() - 1);
    var northEast = this.map.unproject([w, 0], this.map.getMaxZoom() - 1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    L.imageOverlay(url, bounds).addTo(this.map);

    this.map.setMaxBounds(bounds);

    //Aggiungo marker stanze    
    var survey   = L.latLng([-80, 20]);
    var feedback = L.latLng([-90, 200]);
    var training = L.latLng([-150, 100]);

    this.surveyMark   = L.marker(survey  , { icon: surveyIcon })  .on('click', () => this.goToDetination('survey')).addTo(this.map);
    this.feedbackMark = L.marker(feedback, { icon: feedbackIcon }).on('click', () => this.goToDetination('feedback')).addTo(this.map);
    this.trainigMark  = L.marker(training , { icon: trainigIcon }).on('click', () => this.goToDetination('trainig')).addTo(this.map);
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

  goToDetination(dest: string) {
    this.router.navigate([`/${dest}`]);
  }
}

function createCustomIcon(defaultIconUrl: string, iconAnchorLeft: number, iconAnchorTop: number) {
  return L.icon({
    iconUrl: defaultIconUrl,
    iconSize: [128, 128],
    iconAnchor: [iconAnchorLeft, iconAnchorTop],
    popupAnchor: [0, -50],
    tooltipAnchor: [25, -28]
  });
}