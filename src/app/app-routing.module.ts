import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ExpenseListComponent } from './Components/expense-list/expense-list.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { ExpenseStatisticsComponent } from './Components/expense-statistics/expense-statistics.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: ExpenseListComponent},
      { path: 'personal', component: ExpenseListComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'expense-stats', component: ExpenseStatisticsComponent},
    ]
  },
  { path: 'register', loadComponent: () => import('./Components/register/register.component').then(m => m.RegisterComponent) },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
