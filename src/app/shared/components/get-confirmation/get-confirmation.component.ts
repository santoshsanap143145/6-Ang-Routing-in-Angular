import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirmation',
  templateUrl: './get-confirmation.component.html',
  styleUrls: ['./get-confirmation.component.scss'],
})
export class GetConfirmationComponent implements OnInit {
  msg!: string;
  constructor(
    private _openedMatDialog: MatDialogRef<GetConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) getMsg: string
  ) {
    this.msg = getMsg;
  }

  ngOnInit(): void {}

  onClose(flag: boolean) {
    // close the matDialog box with getConfirmationComponent
    this._openedMatDialog.close(flag);
  }
}
