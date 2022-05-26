import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Bono} from "../../entities/bono-entity";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-bono-name-dialog',
  templateUrl: './register-bono-name-dialog.component.html',
  styleUrls: ['./register-bono-name-dialog.component.css']
})
export class RegisterBonoNameDialogComponent implements OnInit {

  nameForm: FormGroup | any

  constructor(private dialogRef: MatDialogRef<RegisterBonoNameDialogComponent>) { }

  Nombre: any = ''

  ngOnInit(): void {

    this.nameForm =  new FormGroup({

Nombre:new FormControl('', [Validators.required]),
    });

  }

}
