import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionBody } from '../interfaces/transaction.interface';
import { TransactionForm } from '../interfaces/transaction-form.interface';
import { TransactionTypes } from '../../../shared/enums/transaction.enum';
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

  create(transactionForm: TransactionForm, departmentId: number, type: TransactionTypes): Observable<void> {
    return this.http.post<void>(
      `http://localhost:8080/api/transactions`,
      this.prepareCreateBody(transactionForm, departmentId, type),
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/transactions/${id}`);
  }

  private prepareCreateBody(transactionForm: TransactionForm, departmentId: number, type: TransactionTypes): TransactionBody {
    return {
      sum: transactionForm.sum,
      type,
      departmentId,
      accountId: transactionForm.account,
      budgetItemId: transactionForm.budgetItem.id,
      paymentDate: transactionForm.paymentDate.toLocaleString('sv').replace(' ', 'T'),
      description: transactionForm.description,
      counterpartyId: transactionForm.counterparty,
    }
  }
}
