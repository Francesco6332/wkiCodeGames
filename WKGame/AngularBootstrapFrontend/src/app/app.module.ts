import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';

import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { RestTableComponent } from './rest-table/rest-table.component';
import { DataService } from './rest-table/data.service';
import { WebcamSchreenshotComponent } from './webcam-schreenshot/webcam-schreenshot.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    RestTableComponent,
    WebcamSchreenshotComponent,
    SideNavBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, HttpClientModule, BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSidenavModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
