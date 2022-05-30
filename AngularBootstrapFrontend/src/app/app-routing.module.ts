import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component'
import { RestTableComponent } from './rest-table/rest-table.component'

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },  
  { path: 'table', component: RestTableComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
