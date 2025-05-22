import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'expenses',
    loadComponent: () => import('./Components/expense-list/expense-list.component')
      .then(m => m.ExpenseListComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
