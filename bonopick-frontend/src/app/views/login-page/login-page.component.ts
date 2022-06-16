import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user-entity';
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

  user!:User

  constructor(private sessionService: SessionService,public formBuilder: FormBuilder, public router: Router) {
    this.user = {} as User;
  }

  async login(){
    this.user.email = this.loginForm.controls['email'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.sessionService.attemptLogin(this.user).then(
      success => {
        if (success)
          this.router.navigateByUrl('/').then(() => {
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
