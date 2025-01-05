import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reports } from '../interfaces/reports.interface';
import { TransactionTypes } from '../../../shared/enums/transaction.enum';
import { buildQueryParams } from '../../../shared/utils/http.util';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http = inject(HttpClient);

  get(type: TransactionTypes, budgetId: number): Observable<Reports> {
    console.log('transactionType', type);
    console.log('budgetId', budgetId);
    return this.http.get<Reports>(`http://localhost:8080/api/reports${buildQueryParams({type, budgetId})}`);
    // return this.http.get<Reports>('https://mock.apidog.com/m1/755292-732507-default/reports');
  }

}
