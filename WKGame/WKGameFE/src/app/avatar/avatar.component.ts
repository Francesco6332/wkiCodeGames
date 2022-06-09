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
  public form: FormGroup;
  public showExtraFields: boolean = false;
  public imgSrc: string = "../../assets/avatars/Astronauta1.png";

  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.form = this.fb.group({
      clienti_seguiti: [''],
      numero_dipendenti: [''],
      ore_lavorate: [''],
      ore_lavorate_remoto: [''],
      citta: [''],
      ruolo: [''],
      hobbies: [''],
      job_department: ['']
    });

    
    http.get<Avatar>(`${environment.api_url}/getAvatar/1`).subscribe(result => {

      this.avatar = result;

      this.form = this.fb.group({
        clienti_seguiti: [this.avatar?.followedCustomers],
        numero_dipendenti: [this.avatar?.companySize],
        ore_lavorate: [this.avatar?.hoursWorkedWeekly],
        ore_lavorate_remoto: [this.avatar?.hoursRemoteWorkedWeekly],
        citta: [this.avatar?.city],
        ruolo: [this.avatar?.jobRole],
        hobbies: [this.avatar?.hobbies],
        job_department: [this.avatar?.jobDepartment]
      });

      // Aggiorno i campi dipendenti dal livello
      this.showExtraFields = this.avatar.currentLevel > 1;
      this.imgSrc = `../../assets/avatars/Astronauta${this.avatar.currentLevel}.png`;


    }, error => {
      
      console.error(error);
    });

    

  }

  ngOnInit(): void {
  }

  submitForm() {

    var updateAvatar: Avatar = {
      nickname: this.avatar?.nickname ?? "",
      avatarId: this.avatar?.avatarId ?? 0,
      avatarImage: this.avatar?.avatarImage ?? "",
      currentScore: this.avatar?.currentScore ?? 0,
      followedCustomers:        this.form.get('clienti_seguiti')?.value ?? 0,
      companySize:              this.form.get('numero_dipendenti')?.value ?? 0,
      hoursWorkedWeekly:        this.form.get('ore_lavorate')?.value ?? 0,
      hoursRemoteWorkedWeekly:  this.form.get('ore_lavorate_remoto')?.value ?? 0,
      city:                     this.form.get('citta')?.value ?? "",
      jobRole:                  this.form.get('ruolo')?.value ?? "",
      jobDepartment:            this.form.get('job_department')?.value ?? "",
      hobbies: this.form.get('hobbies')?.value ?? "",
      currentLevel: this.avatar?.currentLevel ?? 0,

    };

    this.http
      .post(`${environment.api_url}/setAvatar`, updateAvatar)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }



}

interface Avatar {
  avatarId: number;    //Readonly
  nickname: string;
  avatarImage: string;
  currentScore: number; //Readonly
  currentLevel: number; //Readonly
  jobRole: string;
  city: string;
  companySize: number;
  jobDepartment: string;
  followedCustomers: number;
  hoursWorkedWeekly: number;
  hoursRemoteWorkedWeekly: number;
  hobbies: string[];
}
