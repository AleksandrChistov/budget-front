import { Routes } from '@angular/router';
import { TransactionsComponent } from './pages/transactions/components/transactions/transactions.component';
import { AccessesComponent } from './pages/accesses/components/accesses/accesses.component';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';
import { budgetsRoutes } from './pages/budgets/budgets.routes';
import { ReportsComponent } from './pages/reports/components/reports/reports.component';
import { LoginComponent } from './pages/login/login.component';
import { authAdminGuard, authGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'budgets',
    children: budgetsRoutes,
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'accesses',
    component: AccessesComponent,
    canActivate: [authAdminGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [authGuard],
  }
];
