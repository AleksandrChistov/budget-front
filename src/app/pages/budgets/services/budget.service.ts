import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget, BudgetTreeNode } from '../interfaces/budget.interface';
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

  create(budget: Budget): Observable<number> {

    const newBudget: Budget = {
      type: budget.type,
      departmentId: budget.departmentId,
      totals: budget.totals,
      budgetItems: this.prepareBudgetItems(budget.budgetItems)
    }

    return this.http.post<number>(`http://localhost:8080/api/budgets`, newBudget);
  }

  private prepareBudgetItems(items: BudgetTreeNode[]): BudgetTreeNode[] {
    return items.map(item => {
      if (item.children) {
        return {
          data: item.data,
          children: this.prepareBudgetItems(item.children),
          type: item.type
        }
      }
      return {
        data: item.data,
        type: item.type
      };
    })
  }
}
