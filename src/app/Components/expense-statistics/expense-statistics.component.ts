import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expense-statistics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './expense-statistics.component.html',
  styleUrls: ['./expense-statistics.component.scss']
})
export class ExpenseStatisticsComponent {
}
