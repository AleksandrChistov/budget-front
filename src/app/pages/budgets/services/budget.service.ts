import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget, BudgetTreeNode } from '../interfaces/budget.interface';
import { buildQueryParams } from '../../../shared/utils/http.util';
import { BudgetTypes } from '../../../shared/interfaces/budget-types.enum';
import { yearLabels } from '../../reports/consts/years-labels.consts';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  http = inject(HttpClient);

  get(type: BudgetTypes, budgetId: number, year  = yearLabels[yearLabels.length - 1].id): Observable<Budget> {
    return this.http.get<Budget>(`http://localhost:8080/api/budgets${buildQueryParams({type, budgetId, year})}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/budgets/${id}`);
  }

  createNew(departmentId?: number): Observable<Budget> {
    return this.http.post<Budget>(`http://localhost:8080/api/budgets`, {departmentId});
  }

  saveFromExcel(file: File, budgetId: number | undefined): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put<void>(`http://localhost:8080/api/files/upload/${budgetId}`, formData);
  }

  downLoadExcel(budgetId: number, type: BudgetTypes): Observable<string> {
    return this.http.get(`http://localhost:8080/api/files/download${buildQueryParams({budgetId, type})}`,
      { responseType: 'text' }
    );
  }

  update(budget: Budget): Observable<number> {
    const newBudget: Budget = {
      id: budget.id,
      departmentId: budget.departmentId,
      totals: budget.totals,
      budgetItems: this.prepareBudgetItems(budget.budgetItems)
    }

    return this.http.put<number>(`http://localhost:8080/api/budgets/${budget.id}`, newBudget);
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
