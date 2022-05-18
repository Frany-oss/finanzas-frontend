import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  RegisterAnualInflationDialogComponent
} from "../../components/register-anual-inflation-dialog/register-anual-inflation-dialog.component";

@Component({
  selector: 'app-view-register-bono',
  templateUrl: './view-register-bono.component.html',
  styleUrls: ['./view-register-bono.component.css']
})
export class ViewRegisterBonoComponent implements OnInit {

  cant_a: number | any

  constructor(public dialog: MatDialog) {
    this.cant_a = 10
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterAnualInflationDialogComponent, {
      data:{
        c_a: this.cant_a
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
