import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  http = inject(HttpClient);

  get(budgetId?: number, departmentId?: number): Observable<Budget> {
    // TODO: replace mock with real (optional ?departmentId=1&accountId=1)
    return this.http.get<Budget>('https://mock.apidog.com/m1/755292-732507-default/budgets');
  }
}
