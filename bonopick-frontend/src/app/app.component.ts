import { Component } from '@angular/core';
import {SessionService} from "./services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bonopick-frontend';
}

//Confirmation for app deployment
