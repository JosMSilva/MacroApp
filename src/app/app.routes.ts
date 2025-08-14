import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Foodlog } from './foodlog/foodlog';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'foodlog', component: Foodlog }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
