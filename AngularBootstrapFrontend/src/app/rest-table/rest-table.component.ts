import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.css']
})
export class RestTableComponent implements OnInit {
  public forecasts?: WeatherForecast[];
  public score?: Number;
  public score$: Observable<Number>;

  constructor(http: HttpClient, public dataService: DataService) {
    http.get<WeatherForecast[]>(`${environment.api_url}/weatherforecast`).subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

    http.get<Number>(`${environment.api_url}/getScore`).subscribe(result => {
      this.score = result;
    }, error => console.error(error));

    this.score$ = dataService.getCyclicScore();

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

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
