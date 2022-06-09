import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  idAvatar = 1;
  levelAvatar = 0;

  form: FormGroup;

  public question: string = "";

  totalRate = 0;
  easyRate = 0;
  completeRate = 0;
  usefulRate = 0;

  constructor(private http: HttpClient, config: NgbRatingConfig, public fb: FormBuilder, dataService: DataService) {
    // customize default values of ratings used by this component tree
    config.max = 5;

    this.getData();

    // Inizializzo i campi che tengono traccia della form
    this.form = this.fb.group({
      feedbackText: ['']
    });

  }

  ngOnInit(): void {
  }

  submitForm() {

    var feedback: Feedback = {
      question: this.question,
      userId: this.idAvatar,
      totalRate: this.totalRate,
      easyRate: this.easyRate,
      completeRate: this.completeRate,
      usefulRate: this.usefulRate,
      feedbackText: this.form.get('feedbackText')?.value ?? ""
    };

    this.http
      .post(`${environment.api_url}/feedback/sendFeedback`, feedback)
      .subscribe({
        next: (response) => alert("Abbiamo ricevuto il tuo feedback, Grazie!"),
        error: (error) => console.log(error),
      });
  }

  getData() {
    this.http.get<number>(`${environment.api_url}/getAvatarLevel/${this.idAvatar}`).pipe()
      .subscribe({
        next: res => {
          this.levelAvatar = res;
          // Dopo aver caricato il livello, carico la domanda
          this.http.get(`${environment.api_url}/feedback/getQuestion/${this.levelAvatar}`, { responseType: 'text' }).subscribe({
            next: res => {
              this.question = res;
            },
            error: error => {
              console.log(error);
            }
          });
        },
        error: error => {
          console.log(error);
        }
      });
  }

}


interface Feedback {
  question: string;
  userId: number;
  totalRate: number;
  easyRate: number;
  completeRate: number;
  usefulRate: number;
  feedbackText: string;
}
