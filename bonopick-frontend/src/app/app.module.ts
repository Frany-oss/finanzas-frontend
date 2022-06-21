import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBonoFlowPageComponent } from './views/view-bono-flow-page/view-bono-flow-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import { ViewResultsPageComponent } from './views/view-results-page/view-results-page.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import { ViewRegisterBonoComponent } from './views/view-register-bono/view-register-bono.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule } from "@angular/material/input";
import { ViewHomePageComponent } from './views/view-home-page/view-home-page.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import {MatNativeDateModule} from "@angular/material/core";
import { ViewBonoHistoryPageComponent } from './views/view-bono-history-page/view-bono-history-page.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { RegisterAnualInflationDialogComponent } from './components/register-anual-inflation-dialog/register-anual-inflation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import { RegisterBonoNameDialogComponent } from './components/register-bono-name-dialog/register-bono-name-dialog.component';
import {DatePipe} from "@angular/common";
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { EditProfilePageComponent } from './views/edit-profile-page/edit-profile-page.component';
import {MessageBoxDialogComponent} from "./components/message-box-dialog/message-box-dialog.component";
import {MessageBox} from "./components/message-box-dialog/message-box-dialog.provider";


@NgModule({
  declarations: [
    AppComponent,
    ViewBonoFlowPageComponent,
    ViewResultsPageComponent,
    SidenavComponent,
    ViewRegisterBonoComponent,
    ViewHomePageComponent,
    ViewBonoHistoryPageComponent,
    RegisterAnualInflationDialogComponent,
    RegisterBonoNameDialogComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    EditProfilePageComponent,
    MessageBoxDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  providers: [DatePipe, MessageBox],
  bootstrap: [AppComponent]
})
export class AppModule { }
