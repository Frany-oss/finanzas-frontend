import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";
import {Bonista} from "../../entities/bonista-entity";
import {CustomValidators} from "../../providers/CustomValidartors";
import {BonistaService} from "../../services/bonista.service";
import {Button, Buttons} from "../../entities/common";
import {MessageBox} from "../../components/message-box-dialog/message-box-dialog.provider";


@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  user: Bonista = {} as Bonista;
  submitted1: boolean = false;
  submitted2: boolean = false;


  editForm1: FormGroup = this.formBuilder.group({
    fullname: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    phone: ['', {validators: [Validators.pattern(/^[1-9]\d{6,10}$/),Validators.required, Validators.max(999999999),Validators.maxLength(9),Validators.minLength(9)], updateOn: 'change'}],
  });

  editForm2: FormGroup = this.formBuilder.group({
    actualPassword: ['', {validators: [Validators.required], updateOn: 'change'}],
    newPassword: ['', {validators: [Validators.required, Validators.minLength(4) ,Validators.maxLength(60)], updateOn: 'change'}],
    confirmNewPassword: ['', {validators: [Validators.required, Validators.minLength(4) ,Validators.maxLength(60)], updateOn: 'change'}],
  },{validator:CustomValidators("newPassword","confirmNewPassword")});



  constructor(public formBuilder: FormBuilder, public sessionService: SessionService, private mb: MessageBox, public bonistaService: BonistaService) {
    this.sessionService.validateLogin();
    this.user = this.sessionService.getCurrentSession().user;
    this.editForm1.controls['fullname'].setValue(this.user.nombre)
    this.editForm1.controls['phone'].setValue(this.user.telefono)

  }

  ngOnInit(): void {
  }

  validActualPassword(){
    if (this.editForm1.controls['actualPassword'].value == this.user.contrasena)
      return true;
    else
      return false;
  }

  submitUpdateDataForm(){

    let dialog = this.mb.show('Alerta','Para guardar y aplicar los cambios es necesario que vuelva a loguearse. ¿Desea continuar?', Buttons.YesNo);

    dialog.dialogResult$.subscribe(result=>{

      if(result == Button.Yes) {
        this.submitted1 = true;
        this.user.nombre = this.editForm1.controls['fullname'].value;
        this.user.telefono = this.editForm1.controls['phone'].value;
        let data = {
          bonistaId: this.user.bonistaId,
          nombre: this.user.nombre,
          telefono: this.user.telefono
        }

        this.sendData(data);
      }
        });

      }


  submitUpdatePasswordForm(){
/*    if (this.editForm2.controls['actualPassword'].value == this.user.contrasena) {*/
    let validator = {
      correo: this.user.correo,
      contrasena: this.editForm2.controls['actualPassword'].value
    }

    let val = false

    this.sessionService.validPassword(validator).toPromise().then(x=> {
      let dialog = this.mb.show('Alerta','Para guardar y aplicar los cambios realizados es necesario que vuelva a loguearse. ¿Desea continuar?', Buttons.YesNo);

      dialog.dialogResult$.subscribe(result=>{

        if(result == Button.Yes) {
          this.submitted2 = true;
          let newpassword = this.editForm2.controls['newPassword'].value;
          let data = {
            bonistaId: this.user.bonistaId,
            contrasena: newpassword,
          }
          this.sendData(data);
        }
      });
    }).catch(x=> {
      let dialog = this.mb.show('Información','La contraseña actual introducida no es correcta.', Buttons.Ok);
      dialog.dialogResult$.subscribe(result=>{
      });
    })




/*    if (val) {


    } else {

    }*/


  }

  sendData(data: any){
    this.bonistaService.updateUser(data).subscribe(data=> console.log(data));
    this.sessionService.logout();
    window.location.reload();
  }

}
