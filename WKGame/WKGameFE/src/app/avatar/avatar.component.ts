import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  public avatar?: Avatar;

  constructor(http: HttpClient) {
    http.get<Avatar>(`${environment.api_url}/getAvatar/1`).subscribe(result => {

      this.avatar= result;

    }, error => console.error(error));
   }

  ngOnInit(): void {
  }

}

interface Avatar {
  AvatarId: number;    //Readonly
  Nickname: string;
  AvatarImage: string;
  CurrentScore: number; //Readonly
  CurrentLevel: number; //Readonly
  JobRole: string;
  City: string;
  CompanySize: number;
  JobDepartment: string;
  FollowedCustomers: number;
  HoursWorkedWeekly: number;
  HoursRemoteWorkedWeekly: number;
  Hobbies: string[];
}
