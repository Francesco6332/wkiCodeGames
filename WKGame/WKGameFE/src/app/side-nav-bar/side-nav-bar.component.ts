import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  public imgSrc: string = "../../assets/avatars/Astronauta1.png";
  
  public score$: Observable<Number>;

  constructor(http: HttpClient, public dataService: DataService) {
    var result = dataService.getCyclicScore();
    this.score$ = result[1];
    result[0].subscribe((val) =>
      this.imgSrc = `../../assets/avatars/Astronauta${val}.png`
    )

   }

  ngOnInit(): void {
  }

}
