import { Component, OnInit, Inject } from '@angular/core';
import { Buttons, Button } from '../../entities/common';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";

@Component({
  selector: 'app-message-box-dialog',
  templateUrl: './message-box-dialog.component.html',
  styleUrls: ['./message-box-dialog.component.css']
})
export class MessageBoxDialogComponent{

  title = '';
  message = '';
  buttons: Buttons = Buttons.Ok;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message
    this.buttons = data.buttons;
  }

  dialogResultSubject = new Subject<Button>();
  dialogResult$ = this.dialogResultSubject.asObservable();

  public get Buttons(): typeof Buttons {
    return Buttons;
  }

  public get Button(): typeof Button {
    return Button;
  }

  click(button: Button) {
    this.dialogResultSubject.next(button);
  }

  ngOnInit(): void {
  }

}
