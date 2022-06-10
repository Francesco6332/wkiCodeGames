import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import { FeedbackComponent } from './competitions/feedback/feedback.component';
import { MercuryMapComponent } from './planets/mercury-map/mercury-map.component';
import { VenusMapComponent } from './planets/venus-map/venus-map.component';
import { PrizeComponent } from './prize/prize.component';
import { RankingComponent } from './ranking/ranking.component';
import { SocialComponent } from './social/social.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SolarSystemComponent },
  { path: 'mercury', component: MercuryMapComponent },
  { path: 'venus', component: VenusMapComponent },
  { path: 'avatar', component: AvatarComponent},
  { path: 'feedback', component: FeedbackComponent},
  { path: 'prize', component: PrizeComponent},
  { path: 'ranking', component: RankingComponent},
  { path: 'social', component: SocialComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
