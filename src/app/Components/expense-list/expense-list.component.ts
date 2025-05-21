import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseApiService } from 'src/app/Services/expense-api/expense-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ExpenseDialogComponent,
    MatDialogModule,
  ],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  public expenseList: any[] | undefined;

  constructor(
    private expenseApi: ExpenseApiService,
    private dialog: MatDialog
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

  public deleteExpense(id: string): void {
    this.expenseApi.deleteExpense(id).subscribe({
      next: (res) => {
        console.log(res);
        this.loadExpenses();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
