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

  submitForm() {

    var updateAvatar: Avatar = {
      Nickname      : this.avatar?.Nickname ?? "",
      AvatarId      : this.avatar?.AvatarId ?? 0,
      AvatarImage     : this.avatar?.AvatarImage ?? "",
      CurrentScore      : this.avatar?.CurrentScore ?? 0,
      CurrentLevel  : this.avatar?.CurrentLevel ?? 0,
      JobRole    : this.avatar?.JobRole ?? "",
      FollowedCustomers   : this.avatar?.FollowedCustomers ?? 0,
      City     : this.avatar?.City ?? "",
      CompanySize     : this.avatar?.CompanySize ?? 0,
      JobDepartment   : this.avatar?.JobDepartment ?? "",
      HoursWorkedWeekly     : this.avatar?.HoursWorkedWeekly ?? 0,
      HoursRemoteWorkedWeekly     : this.avatar?.HoursRemoteWorkedWeekly ?? 0,
      Hobbies     : this.avatar?.Hobbies ?? [],
  };

    this.http
      .post(`${environment.api_url}/sendAvatar`, updateAvatar)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
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
