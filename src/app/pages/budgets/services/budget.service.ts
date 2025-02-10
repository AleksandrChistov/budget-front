import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Budget, BudgetTreeNode } from '../interfaces/budget.interface';
import { buildQueryParams } from '../../../shared/utils/http.util';
import { BudgetTypes } from '../../../shared/interfaces/budget-types.enum';
import { yearLabels } from '../../reports/consts/years-labels.consts';
import { baseUrl } from '../../../shared/consts/config.const';
import { LoadingService } from '../../../shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  get(type: BudgetTypes, budgetId: number, year  = yearLabels[yearLabels.length - 1].id): Observable<Budget> {
    this.loadingService.load();
    return this.http.get<Budget>(`${baseUrl}/api/budgets${buildQueryParams({type, budgetId, year})}`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  delete(id: number): Observable<void> {
    this.loadingService.load();
    return this.http.delete<void>(`${baseUrl}/api/budgets/${id}`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  createNew(departmentId?: number): Observable<Budget> {
    this.loadingService.load();
    return this.http.post<Budget>(`${baseUrl}/api/budgets`, {departmentId}).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  saveFromExcel(file: File, budgetId: number | undefined): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    this.loadingService.load();
    return this.http.put<void>(`${baseUrl}8080/api/files/upload/${budgetId}`, formData).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  downLoadExcel(budgetId: number, type: BudgetTypes): Observable<string> {
    this.loadingService.load();
    return this.http.get(`${baseUrl}/api/files/download${buildQueryParams({budgetId, type})}`,
      { responseType: 'text' }
    ).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  update(budget: Budget): Observable<number> {
    const newBudget: Budget = {
      id: budget.id,
      departmentId: budget.departmentId,
      totals: budget.totals,
      budgetItems: this.prepareBudgetItems(budget.budgetItems)
    }

    this.loadingService.load();

    return this.http.put<number>(`${baseUrl}/api/budgets/${budget.id}`, newBudget).pipe(
      finalize(() => this.loadingService.stop())
    );
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
