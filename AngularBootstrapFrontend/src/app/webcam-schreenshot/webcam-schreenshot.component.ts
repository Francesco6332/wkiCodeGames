import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-webcam-schreenshot',
  templateUrl: './webcam-schreenshot.component.html',
  styleUrls: ['./webcam-schreenshot.component.css']
})
export class WebcamSchreenshotComponent implements AfterViewInit {
  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video")
  public video: ElementRef = new ElementRef(null);

  @ViewChild("canvas")
  public canvas: ElementRef = new ElementRef(null);

  captures: string[] = [];
  error: any;
  isCaptured: boolean = false;
  
  constructor(private http: HttpClient) { }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  async capture() {
    //copio lo screenshot in un canvas
    this.drawImageToCanvas(this.video.nativeElement);
    
    //creo un blob a partire dal canvas
    let blob = await new Promise(resolve => this.canvas.nativeElement.toBlob(resolve, 'image/jpeg', 1));
    
    // lo invio al backend
    this.uploadFile(blob);
  }


  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  uploadFile(fileToUpload: any){
    
    const formData = new FormData();
    formData.append('file', fileToUpload, 'screen.jpeg');
    
    this.http.post(`${environment.api_url}/uploadImage`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
         if (event.type === HttpEventType.Response) {
          var result = event.body as String[];

          //Gestione dei dati
          alert(`You seem ${result[0]} and even a little ${result[1]}`);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
  
}
