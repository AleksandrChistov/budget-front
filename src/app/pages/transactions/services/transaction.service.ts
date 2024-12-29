import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { buildQueryParams } from '../../../shared/utils/http.util';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient);

  get(departmentId?: number, accountId?: number): Observable<Array<Transaction>> {
    return this.http.get<Array<Transaction>>(
      `http://localhost:8080/api/transactions${buildQueryParams({departmentId, accountId})}`,
    );
  }
}
