import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import { MercuryMapComponent } from './planets/mercury-map/mercury-map.component';
import { VenusMapComponent } from './planets/venus-map/venus-map.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SolarSystemComponent },
  { path: 'mercury', component: MercuryMapComponent },
  { path: 'venus', component: VenusMapComponent },
  { path: 'avatar', component: AvatarComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
