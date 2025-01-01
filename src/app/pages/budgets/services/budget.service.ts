import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../interfaces/budget.interface';
import { buildQueryParams } from '../../../shared/utils/http.util';
import { BudgetTypes } from '../../../shared/interfaces/budget-types.enum';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  http = inject(HttpClient);

  get(type: BudgetTypes, budgetId: number): Observable<Budget> {
    return this.http.get<Budget>(`http://localhost:8080/api/budgets${buildQueryParams({type, budgetId})}`);
  }
}
