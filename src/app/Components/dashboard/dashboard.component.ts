import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LoaderComponent } from '../loader/loader.component';
import { ExpenseStatisticsComponent } from '../expense-statistics/expense-statistics.component';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    ExpenseListComponent,
    MatTabsModule,
    RouterModule,
    ToolbarComponent,
    LoaderComponent,
    CalculatorComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tabIndex: number = 0;
  public tabs = [
    { label: 'Expense Stats', path: 'expense-stats', component: ExpenseStatisticsComponent },
    { label: 'Personal Expense', path: 'personal', component: ExpenseListComponent },
    { label: 'Groups', path: 'groups', component: null }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.firstChild?.url.subscribe(urlSegment => {
      const currentPath = urlSegment[0]?.path;
      const index = this.tabs.findIndex(tab => tab.path === currentPath);
      this.tabIndex = index >= 0 ? index : 0;
    });
  }

  onTabChange(index: number): void {
    const tabPath = this.tabs[index].path;
    this.router.navigate([tabPath], { relativeTo: this.route });
  }
}
