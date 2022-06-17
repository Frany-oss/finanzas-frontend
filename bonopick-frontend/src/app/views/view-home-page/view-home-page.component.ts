import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  RegisterBonoNameDialogComponent
} from "../../components/register-bono-name-dialog/register-bono-name-dialog.component";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-view-home-page',
  templateUrl: './view-home-page.component.html',
  styleUrls: ['./view-home-page.component.css']
})
export class ViewHomePageComponent implements OnInit {
  breakpoint: number;
  breakpointDos:number;
  constructor(public dialog: MatDialog, private sessionService: SessionService) {
    this.sessionService.validateLogin();
    this.breakpoint=0;this.breakpointDos=0 }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1063) ? 1 : 2;
    this.breakpointDos = (window.innerWidth <= 1063) ? 2 : 1;
  }

  onResize(event :any) {
    this.breakpoint = (event.target.innerWidth <= 1063) ? 1 : 2;
    this.breakpointDos = (event.target.innerWidth <= 1063) ? 2 : 1;
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterBonoNameDialogComponent, {
      panelClass: 'dialogInsertName'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
