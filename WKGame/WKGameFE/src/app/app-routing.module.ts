import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestTableComponent } from './rest-table/rest-table.component'
import { SolarSystemComponent } from './solar-system/solar-system.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SolarSystemComponent },  
  { path: 'table', component: RestTableComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
