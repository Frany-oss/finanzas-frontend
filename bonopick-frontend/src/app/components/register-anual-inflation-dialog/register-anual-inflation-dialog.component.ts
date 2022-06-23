import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register-anual-inflation-dialog',
  templateUrl: './register-anual-inflation-dialog.component.html',
  styleUrls: ['./register-anual-inflation-dialog.component.css']
})



export class RegisterAnualInflationDialogComponent implements OnInit {

  skills = new FormArray([]);
  n = 0;
  cons_rate: number = 0 ;

  toControl(absCtrl: AbstractControl): FormControl {
    const ctrl = absCtrl as FormControl;
    // if(!ctrl) throw;
    return ctrl;
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<RegisterAnualInflationDialogComponent>) {
    console.log(`${data.arr_desc}`);
/*    if((data.arr_desc==='')){*/
    this.n= data.c_a;
    for(let i=0;i<this.n;i++) this.skills.push(new FormControl('0'));
      console.log("hola");/*
    }
    else {

      for(let i=0;i<this.data.arr_desc.length;i++) this.skills.push(new FormControl(data.arr_desc[i]));
      for (let i=0;i<this.data.arr_desc.length;i++){
        this.skills.controls[i].setValue(data.arr_desc[i]);
      }
      console.log("no ga");
    }*/
  }

  ngOnInit(): void {

  }

  set_const_rate(c : number) {
    for (let i=0;i<this.n;i++){
      this.skills.controls[i].setValue(c);
    }
  }

  send_data(){
    let descuentos_anio = new Array(this.n)

    for (let i=0;i<this.n;i++){
      descuentos_anio[i] = this.skills.controls[i].value;
    }
    console.log(`Dialog result: ${descuentos_anio}`);
    this.dialogRef.close({data: descuentos_anio});
  }




}
