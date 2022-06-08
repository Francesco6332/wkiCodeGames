import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public randomNumber?: Number;
  public testString?: string;

  constructor(http: HttpClient) {
    http.get(`${environment.api_url}/getTestString`,  {responseType: 'text'}).subscribe({
      next: result => { this.testString = result },
      error: err => { this.testString = "API ERROR" }
   });
      
   http.get<Number>(`${environment.api_url}/getRandomNumber`).subscribe({
    next: result => { this.randomNumber = result },
    error: err => { this.randomNumber = -1 }
 });

  }

  title = 'WKGame';
}
