import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: 'success' | 'error' }) { }

}
