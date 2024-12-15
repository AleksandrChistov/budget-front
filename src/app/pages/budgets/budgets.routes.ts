import { Routes } from '@angular/router';
import { RevenueComponent } from './components/revenue/revenue.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { CapexComponent } from './components/capex/capex.component';
import { CapitalComponent } from './components/capital/capital.component';

export const budgetsRoutes: Routes = [
  {
    path: 'revenue',
    component: RevenueComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'capex',
    component: CapexComponent,
  },
  {
    path: 'capital',
    component: CapitalComponent,
  },
];
