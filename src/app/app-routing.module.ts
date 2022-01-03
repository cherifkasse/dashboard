import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import {TablePageSignComponent} from "./table-page-sign/table-page-sign.component";

const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'table-sign', component: TablePageSignComponent },
  { path: '**', component: DashboardPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
