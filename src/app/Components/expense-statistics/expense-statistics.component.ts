import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexDataLabels, ApexStroke, ApexTitleSubtitle, ApexTooltip } from 'ng-apexcharts';
import { ExpenseApiService } from 'src/app/Services/expense-api/expense-api.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-expense-statistics',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    NgApexchartsModule],
  templateUrl: './expense-statistics.component.html',
  styleUrls: ['./expense-statistics.component.scss']
})
export class ExpenseStatisticsComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public totalExpense: number = 0;

  constructor(private expenseApiService: ExpenseApiService) { }

  ngOnInit(): void {
    this.expenseApiService.getExpenses().subscribe({
      next: (expenses) => {
        this.totalExpense = expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0); console.log(this.totalExpense);
        const monthlyTotals = new Array(12).fill(0);
        expenses.forEach((expense: any) => {
          const monthIndex = new Date(expense.date).getMonth(); // 0 = Jan, 11 = Dec
          monthlyTotals[monthIndex] += expense.amount;
        });
        this.chartOptions = {
          series: [
            {
              name: 'Expenses',
              data: monthlyTotals,
            },
          ],
          chart: {
            type: 'line',
            height: 300,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          title: {
            text: 'Monthly Expense Trend',
            align: 'left',
          },
          xaxis: {
            categories: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: (val: number) => `₹${val}`,
            },
          }
        };
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
