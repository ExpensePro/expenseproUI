import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseApiService } from 'src/app/Services/expense-api/expense-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { SnackbarService } from 'src/app/Services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ExpenseDialogComponent,
    MatDialogModule,
    DeleteComponent,
  ],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  public expenseList: any[] | undefined;

  constructor(
    private expenseApi: ExpenseApiService,
    private dialog: MatDialog,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  public loadExpenses(): void {
    this.expenseApi.getExpenses().subscribe({
      next: (res) => {
        this.expenseList = res;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.displaySnackBar("Unable to load your expenses right now", 'error');
      },
      complete: () => {
        console.log("fetch complete")
      }
    })
  }

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with:', result);
      if (result === 'refresh') {
        console.log("load");

        this.loadExpenses();
      }
    });
  }

  public editExpense(expense: any): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '400px',
      maxHeight: 'none',
      data: expense // Pass the selected expense
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadExpenses();
      }
    });
  }

  public opendeleteDialog(expense: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '350px',
      maxHeight: 'none',
      data: expense,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteExpense(expense.id);
      }
    })
  }

  public deleteExpense(id: string): void {
    this.expenseApi.deleteExpense(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.displaySnackBar("Unable to deleete expense", 'error');
      },
      complete: () => {
        this.loadExpenses();
        this.snackBar.displaySnackBar("Expense deleted successfully", 'success');
      },
    })
  }
}
