import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Transaction, TransactionBody } from '../interfaces/transaction.interface';
import { TransactionForm } from '../interfaces/transaction-form.interface';
import { TransactionTypes } from '../../../shared/enums/transaction.enum';
import { buildQueryParams } from '../../../shared/utils/http.util';
import { baseUrl } from '../../../shared/consts/config.const';
import { LoadingService } from '../../../shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  get(departmentId?: number, accountId?: number): Observable<Array<Transaction>> {
    this.loadingService.load();
    return this.http.get<Array<Transaction>>(
      `${baseUrl}/api/transactions${buildQueryParams({departmentId, accountId})}`,
    ).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  create(transactionForm: TransactionForm, departmentId: number, type: TransactionTypes): Observable<void> {
    this.loadingService.load();
    return this.http.post<void>(
      `${baseUrl}/api/transactions`,
      this.prepareCreateBody(transactionForm, departmentId, type),
    ).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  delete(id: number): Observable<void> {
    this.loadingService.load();
    return this.http.delete<void>(`${baseUrl}/api/transactions/${id}`).pipe(
      finalize(() => this.loadingService.stop())
    );
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
