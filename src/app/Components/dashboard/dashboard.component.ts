import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ExpenseListComponent, MatTabsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public selectedIndex: number | undefined;
  public tabs = [
    { label: 'Personal Expense', key: 'personal', component: ExpenseListComponent },
    { label: 'Groups', key: 'groups', component: null }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }
  public ngOnInit(): void {
    const tabParam = this.route.snapshot.queryParamMap.get('tab');
    const foundIndex = this.tabs.findIndex(tab => tab.key === tabParam);
    this.selectedIndex = foundIndex >= 0 ? foundIndex : 0;
  }

  onTabChange(index: number): void {
    const tabKey = this.tabs[index].key;
    this.router.navigate([], {
      queryParams: { tab: tabKey },
      queryParamsHandling: 'merge'
    });
  }

}
