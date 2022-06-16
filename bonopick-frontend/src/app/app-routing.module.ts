import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBonoFlowPageComponent } from './views/view-bono-flow-page/view-bono-flow-page.component';
import {ViewResultsPageComponent} from "./views/view-results-page/view-results-page.component";
import {ViewRegisterBonoComponent} from "./views/view-register-bono/view-register-bono.component";
import {ViewHomePageComponent} from "./views/view-home-page/view-home-page.component";
import {ViewBonoHistoryPageComponent} from "./views/view-bono-history-page/view-bono-history-page.component";
import {
  RegisterAnualInflationDialogComponent
} from "./components/register-anual-inflation-dialog/register-anual-inflation-dialog.component";

const routes: Routes = [
  {path: '',component: ViewHomePageComponent},
  {path: 'home', component: ViewHomePageComponent},
  {path: 'register-bono/:name', component:ViewRegisterBonoComponent},
  {path: 'register-anual-inflation-dialog', component:RegisterAnualInflationDialogComponent},
  {path: 'bono-history', component:ViewBonoHistoryPageComponent},
  {path: 'view-bono-results/:id', component: ViewResultsPageComponent},
  {path: 'view-bono-results/:id/view-bono-flow', component: ViewBonoFlowPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
