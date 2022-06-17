import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Bonista } from 'src/app/entities/bonista-entity';
import { BonistaService } from 'src/app/services/bonista.service';
import {SessionService} from "../../services/session.service";
import {CustomValidators} from "../../providers/CustomValidartors";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  user: Bonista = {} as Bonista;
  submitted: boolean = false;

  registerForm: FormGroup = this.formBuilder.group({
    fullname: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    email: ['', {validators: [Validators.email,Validators.required], updateOn: 'change'}],
    phone: ['', {validators: [Validators.pattern(/^[1-9]\d{6,10}$/),Validators.required, Validators.max(999999999),Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
    password: ['', {validators: [Validators.required, Validators.minLength(4) ,Validators.maxLength(60)], updateOn: 'change'}],
    confirmpassword: ['', {validators: [Validators.required, Validators.minLength(4) ,Validators.maxLength(60)], updateOn: 'change'}],
  }, {validator:CustomValidators("password","confirmpassword")});



  constructor(private userService: BonistaService, public formBuilder: FormBuilder, public router: Router, private sessionService: SessionService) {
    this.sessionService.validateSession();
  }

  ngOnInit(): void {
  }



  submitForm(){
    this.submitted = true;
    this.user.nombre = this.registerForm.controls['fullname'].value;
    this.user.correo = this.registerForm.controls['email'].value.toLowerCase();
   this.user.telefono = Number(this.registerForm.controls['phone'].value);
    this.user.contrasena = this.registerForm.controls['password'].value;

    this.addUser();
    this.clearForm();
  }


  clearForm(){
    for(let control in this.registerForm.controls){
      this.registerForm.controls[control].setErrors(null);
    }

    this.registerForm.reset();
  }

  addUser(){

    let temp = {
      nombre: this.user.nombre,
      correo: this.user.correo,
      contrasena: this.user.contrasena,
      telefono:this.user.telefono
    }

    this.userService.postUser(temp).subscribe((response: any) => {});
  }

  cancelButton(){
    this.clearForm();
  }

}
