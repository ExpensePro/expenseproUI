import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseApiService } from 'src/app/Services/expense-api/expense-api.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule],
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent implements OnInit {

  expenseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private expenseApi: ExpenseApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      amount: [this.data?.amount || null, [Validators.required, Validators.min(1)]],
      category: [this.data?.category || '', Validators.required],
      date: [this.data?.date || new Date().toISOString().substring(0, 10), Validators.required]
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched;
      return;
    }
    const expense = this.expenseForm.value;

    if (this.data?.id) {
      this.expenseApi.updateExpense(this.data.id, expense).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: err => console.error('Error updating expense:', err)
      });
    }
    else {
      this.expenseApi.addExpense(expense).subscribe({
        next: () => {
          this.dialogRef.close('refresh')
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }
}
