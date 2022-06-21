import { MatDialog } from "@angular/material/dialog";
import { Button, Buttons } from "../../entities/common";
import { Observable, Subject } from "rxjs";
import { MessageBoxDialogComponent } from "./message-box-dialog.component";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageBox {
  constructor(private dialog: MatDialog) {
  }

  private dialogResultSubject!: Subject<Button>;
  dialogResult$!: Observable<Button>;

  show(title: string, message?: string, buttons?: Buttons): MessageBox {

    let dialogRef = this.dialog.open(MessageBoxDialogComponent, {
        data: {
          title,
          message,
          buttons: buttons ?? Buttons.Ok
        }
      }
    );

    this.dialogResultSubject = new Subject<Button>();
    this.dialogResult$ = this.dialogResultSubject.asObservable()

    dialogRef.componentInstance.dialogResult$.subscribe(pressedButton => {
      this.dialogResultSubject.next(pressedButton);
      this.dialogResultSubject.complete();
      dialogRef.close();
    });

    return this;
  }
}
