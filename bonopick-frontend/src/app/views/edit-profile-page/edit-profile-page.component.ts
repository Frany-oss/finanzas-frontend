import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";
import {Bonista} from "../../entities/bonista-entity";
import {CustomValidators} from "../../providers/CustomValidartors";


@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  editForm1: FormGroup = this.formBuilder.group({
    fullname: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    phone: ['', {validators: [Validators.pattern(/^[1-9]\d{6,10}$/),Validators.required, Validators.max(999999999),Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
  });

  editForm2: FormGroup = this.formBuilder.group({
    actualPassword: ['', {validators: [Validators.required], updateOn: 'change'}],
    newPassword: ['', {validators: [Validators.required, Validators.minLength(4) ,Validators.maxLength(60)], updateOn: 'change'}],
    confirmNewPassword: ['', {validators: [Validators.required, Validators.minLength(4) ,Validators.maxLength(60)], updateOn: 'change'}],
  },{validator:CustomValidators("newPassword","confirmNewPassword")});



  constructor(public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {


  }

}
