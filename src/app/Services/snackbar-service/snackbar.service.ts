import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/Components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  displaySnackBar(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['no-default-snackbar']
    });
  }
}
