import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBonoPageComponent } from './views/view-bono-page/view-bono-page.component';

const routes: Routes = [
  {path: 'view-bono/:id', component: ViewBonoPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
