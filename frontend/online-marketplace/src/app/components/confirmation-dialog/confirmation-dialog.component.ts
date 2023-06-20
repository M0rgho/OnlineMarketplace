import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  price: number = 1;
  sell:  boolean = false;
  text: string = "";
  loggedIn!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { loggedIn: boolean, sell: boolean, text: string}
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.price);
  }

  onLoginClick(): void {
    this.dialogRef.close(false);
    this.router.navigate(['/login'])
  }
}
