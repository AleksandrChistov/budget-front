import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reports } from '../interfaces/reports.interface';
import { TransactionTypes } from '../../../shared/enums/transaction.enum';
import { buildQueryParams } from '../../../shared/utils/http.util';
import { yearLabels } from '../consts/years-labels.consts';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http = inject(HttpClient);

  get(type = TransactionTypes.EXPENSE, year = yearLabels[yearLabels.length - 1].id, budgetId: number): Observable<Reports> {
    console.log('transactionType', type);
    console.log('year', year);
    console.log('budgetId', budgetId);
    return this.http.get<Reports>(`http://localhost:8080/api/reports${buildQueryParams({type, year, budgetId})}`);
  }

}
