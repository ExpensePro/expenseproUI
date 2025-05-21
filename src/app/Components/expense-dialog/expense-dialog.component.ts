import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseApiService } from 'src/app/Services/expense-api/expense-api.service';

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent implements OnInit {

  expenseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private expenseApi: ExpenseApiService,
  ) {
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
    title: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    date: [new Date().toISOString().substring(0, 10), Validators.required]
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const expense = this.expenseForm.value;
    this.expenseApi.addExpense(expense).subscribe({
      next: ()=>{
        this.dialogRef.close('refresh')
      },
      error: (err)=>{
        console.error(err);
      }
    })
    console.log(this.expenseForm.value);
    
  }
}
