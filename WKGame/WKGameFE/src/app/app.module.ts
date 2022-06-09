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
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';
import { MercuryMapComponent } from './planets/mercury-map/mercury-map.component';
import { VenusMapComponent } from './planets/venus-map/venus-map.component';
import { FeedbackComponent } from './competitions/feedback/feedback.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { PrizeComponent } from './prize/prize.component';
import { RankingComponent } from './ranking/ranking.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavBarComponent,
    AvatarComponent,
    SolarSystemComponent,
    MercuryMapComponent,
    VenusMapComponent,
    FeedbackComponent,
    PrizeComponent,
    RankingComponent,
    SocialComponent,
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
    MatFormFieldModule,
    NgbModule, 
    FormsModule, ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
