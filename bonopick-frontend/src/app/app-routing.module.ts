import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBonoFlowPageComponent } from './views/view-bono-flow-page/view-bono-flow-page.component';
import {ViewResultsPageComponent} from "./views/view-results-page/view-results-page.component";

const routes: Routes = [

  {path: 'view-bono-results/:id', component: ViewResultsPageComponent},
  {path: 'view-bono-results/:id/view-bono-flow', component: ViewBonoFlowPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
