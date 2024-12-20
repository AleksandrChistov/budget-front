import { Routes } from '@angular/router';
import { RevenueComponent } from './components/pages/revenue/revenue.component';
import { ExpensesComponent } from './components/pages/expenses/expenses.component';
import { CapexComponent } from './components/pages/capex/capex.component';
import { CapitalComponent } from './components/pages/capital/capital.component';

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
