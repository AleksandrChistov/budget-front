import { Routes } from '@angular/router';
import { IncomeComponent } from './pages/reports/components/income/income.component';
import { TransactionsComponent } from './pages/transactions/components/transactions/transactions.component';
import { AccessesComponent } from './pages/accesses/components/accesses/accesses.component';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';
import { budgetsRoutes } from './pages/budgets/budgets.routes';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    component: IncomeComponent,
  },
  {
    path: 'budgets',
    children: budgetsRoutes,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'accesses',
    component: AccessesComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
