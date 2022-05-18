import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-register-anual-inflation-dialog',
  templateUrl: './register-anual-inflation-dialog.component.html',
  styleUrls: ['./register-anual-inflation-dialog.component.css']
})



export class RegisterAnualInflationDialogComponent implements OnInit {

  skills = new FormArray([]);

  toControl(absCtrl: AbstractControl): FormControl {
    const ctrl = absCtrl as FormControl;
    // if(!ctrl) throw;
    return ctrl;
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    let n= data.c_a;
    for(let i=0;i<n;i++) this.skills.push(new FormControl(''));
  }

  ngOnInit(): void {

  }




}
