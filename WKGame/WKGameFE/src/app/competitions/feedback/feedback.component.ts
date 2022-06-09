import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  //Da fare dinamica ad esempio con una get
  public question: string = "Cosa ne pensi della nuova funzionalità Dismissioni dei cespiti di Genya?";
  totalRate = 0;
  easyRate = 0;
  ccompleteRate = 0;
  usefulRate = 0;
  
  constructor(config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 5;

  }

  ngOnInit(): void {
  }

}
