import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ExpenseListComponent } from './Components/expense-list/expense-list.component';
import { GroupsComponent } from './Components/groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'personal', component: ExpenseListComponent },
      { path: 'groups', component: GroupsComponent } // Replace with actual component
    ]
  },
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
