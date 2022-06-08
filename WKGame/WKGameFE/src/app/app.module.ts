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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { HeaderComponent } from './header/header.component';
import { RestTableComponent } from './rest-table/rest-table.component';
import { DataService } from './rest-table/data.service';
import { WebcamSchreenshotComponent } from './webcam-schreenshot/webcam-schreenshot.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';
import { MercuryMapComponent } from './planets/mercury-map/mercury-map.component';
import { VenusMapComponent } from './planets/venus-map/venus-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RestTableComponent,
    WebcamSchreenshotComponent,
    SideNavBarComponent,
    AvatarComponent,
    SolarSystemComponent,
    MercuryMapComponent,
    VenusMapComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, HttpClientModule, BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatFormFieldModule
  ],
  providers: [DataService, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
