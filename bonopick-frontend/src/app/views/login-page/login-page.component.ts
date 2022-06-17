import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Bonista } from 'src/app/entities/bonista-entity';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', {validators: [Validators.email], updateOn: 'change'}],
    password: ['', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'change'}],
  });

  user!:Bonista

  constructor(private sessionService: SessionService,public formBuilder: FormBuilder, public router: Router) {
    this.sessionService.validateSession();
    this.user = {} as Bonista;
  }

  async login(){
    this.user.correo = this.loginForm.controls['email'].value;
    this.user.contrasena = this.loginForm.controls['password'].value;
    this.sessionService.attemptLogin(this.user).then(
      success => {
        if (success)
          this.router.navigateByUrl('/profile').then(() => {
            window.location.reload();
          });
      }
    ).catch(() => {
        alert("Wrong login details.");
    });
  }

  ngOnInit(): void {
  }
}
