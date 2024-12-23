import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient);

  get(departmentId?: number, accountId?: number): Observable<Array<Transaction>> {
    // TODO: replace mock with real (optional ?departmentId=1&accountId=1)
    // check departmentId ?? '' and accountId ?? ''
    return this.http.get<Array<Transaction>>( `https://mock.apidog.com/m1/755292-732507-default/operations`);
  }
}
