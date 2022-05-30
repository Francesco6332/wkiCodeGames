import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.css']
})
export class RestTableComponent implements OnInit {
  public forecasts?: WeatherForecast[];
  public score?: Number;

  constructor(http: HttpClient) {
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

    http.get<Number>('/getScore').subscribe(result => {
      this.score = result;
    }, error => console.error(error));
  }


  ngOnInit(): void {
  }

  // Tabella di Angular Material
  columns = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: WeatherForecast) => `${element.date}`,
    },
    {
      columnDef: 'tempC',
      header: 'Temp. (C)',
      cell: (element: WeatherForecast) => `${element.temperatureC}`,
    },
    {
      columnDef: 'tempF',
      header: 'Temp. (F)',
      cell: (element: WeatherForecast) => `${element.temperatureF}`,
    },
    {
      columnDef: 'summary',
      header: 'Summary',
      cell: (element: WeatherForecast) => `${element.summary}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  title = 'AngularBootstrapFrontend';
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
