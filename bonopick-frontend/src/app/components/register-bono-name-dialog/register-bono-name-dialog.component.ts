import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register-bono-name-dialog',
  templateUrl: './register-bono-name-dialog.component.html',
  styleUrls: ['./register-bono-name-dialog.component.css']
})
export class RegisterBonoNameDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RegisterBonoNameDialogComponent>) { }

  Nombre: any = ''

  ngOnInit(): void {
  }


}
