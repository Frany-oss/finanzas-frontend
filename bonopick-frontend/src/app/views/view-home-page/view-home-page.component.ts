import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  RegisterBonoNameDialogComponent
} from "../../components/register-bono-name-dialog/register-bono-name-dialog.component";

@Component({
  selector: 'app-view-home-page',
  templateUrl: './view-home-page.component.html',
  styleUrls: ['./view-home-page.component.css']
})
export class ViewHomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterBonoNameDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
