import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  userlevel = 1;
  userid = 1;

  form: FormGroup;

  public question: string = "";

  totalRate = 0;
  easyRate = 0;
  completeRate = 0;
  usefulRate = 0;

  constructor(private http: HttpClient, config: NgbRatingConfig, public fb: FormBuilder) {
    // customize default values of ratings used by this component tree
    config.max = 5;

    http.get(`${environment.api_url}/feedback/getQuestion/${this.userlevel}`, { responseType: 'text' }).subscribe({
      next: res => {
        this.question = res;
      },
      error: error => {
        // handle error
      }
    });

    // Inizializzo i campi che tengono traccia della form
    this.form = this.fb.group({
      feedbackText: ['']
    });

  }

  ngOnInit(): void {
  }

  submitForm() {

    var feedback: Feedback = {
      question      : this.question,
      userId        : this.userid,
      totalRate     : this.totalRate,
      easyRate      : this.easyRate,
      completeRate  : this.completeRate,
      usefulRate    : this.usefulRate,
      feedbackText  : this.form.get('feedbackText')?.value ?? ""
  };

    this.http
      .post(`${environment.api_url}/feedback/sendFeedback`, feedback)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
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
