import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  public avatar?: Avatar;
  form: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    http.get<Avatar>(`${environment.api_url}/getAvatar/1`).subscribe(result => {

      this.avatar= result;

    }, error => console.error(error));

    this.form = this.fb.group({
      clienti_seguiti: [''],
      numero_dipendenti: [''],
      ore_lavorate: [''],
      ore_lavorate_remoto: [''],
      citta: [''],
      job_role: [''],
      hobbies: [''],
      job_department: ['']
    });

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
      JobRole    : this.form.get('job_role')?.value ?? "",
      FollowedCustomers   : this.form.get('clienti_seguiti')?.value ?? 0,
      City     : this.form.get('citta')?.value ?? "",
      CompanySize     : this.form.get('numero_dipendenti')?.value ?? 0,
      JobDepartment   : this.form.get('job_department')?.value ?? "",
      HoursWorkedWeekly     : this.form.get('ore_lavorate')?.value ?? 0,
      HoursRemoteWorkedWeekly     : this.form.get('ore_lavorate_remoto')?.value ?? 0,
      Hobbies     : this.form.get('hobbies')?.value ?? "",

  };

    this.http
      .post(`${environment.api_url}/setAvatar/${this.avatar?.AvatarId}`, updateAvatar)
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
