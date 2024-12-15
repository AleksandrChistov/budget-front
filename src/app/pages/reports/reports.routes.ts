import { Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomeComponent } from './components/income/income.component';

export const reportsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'income',
    pathMatch: 'full',
  },
  {
    path: 'income',
    component: IncomeComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
];
