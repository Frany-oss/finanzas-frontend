import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  username: string = ""
  email: string =""
  telefono: number = 0

  constructor(private sessionService: SessionService) { }



  ngOnInit(): void {
    this.sessionService.validateLogin()

    this.username = this.sessionService.getCurrentSession().user.nombre;
    this.email = this.sessionService.getCurrentSession().user.correo;
    this.telefono = this.sessionService.getCurrentSession().user.telefono;

  }

}
