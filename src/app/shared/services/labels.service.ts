import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AccountOption, AccountResponse, BudgetItem } from '../../pages/transactions/interfaces/transaction.interface';
import { OptionName } from '../interfaces/option.interface';
import { BudgetTypes } from '../interfaces/budget-types.enum';
import { AccountTypes } from '../../pages/transactions/enums/account.enum';
import { TransactionTypes } from '../enums/transaction.enum';
import { buildQueryParams } from '../utils/http.util';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  http = inject(HttpClient);

  // TODO: rename and delete budgetType and transactionType from args
  getBudgets(departmentId?: number): Observable<OptionName<number>[]> {
    return this.http.get<OptionName<number>[]>(`http://localhost:8080/api/budgets/names${buildQueryParams({departmentId})}`);
  }

  getDepartments(): Observable<OptionName<number>[]> {
    return this.http.get<OptionName<number>[]>('http://localhost:8080/api/departments');
  }

  getAccounts(departmentId?: number): Observable<AccountOption[]> {
    return this.http.get<AccountResponse[]>(`http://localhost:8080/api/accounts${buildQueryParams({departmentId})}`)
      .pipe(
        map((accounts: AccountResponse[]) => {
          const bank = {
            title: 'Банковский',
            icon: 'id-card',
            children: [] as OptionName<number>[],
          }
          const cash = {
            title: 'Наличные',
            icon: 'money-bill',
            children: [] as OptionName<number>[],
          }
          accounts.forEach(({ type, id, name }) => {
            if (type === AccountTypes.BANK) {
              bank.children.push({ id, name });
            } else {
              cash.children.push({ id, name });
            }
          });
          return [bank, cash];
        })
      );
  }

  getBudgetItems(budgetType: BudgetTypes, transactionType: TransactionTypes): Observable<BudgetItem[]> {
    return this.http.get<BudgetItem[]>(`http://localhost:8080/api/budget-items${buildQueryParams({budgetType, transactionType})}`);
  }

  getCounterparties(): Observable<OptionName<number>[]> {
    return this.http.get<OptionName<number>[]>('http://localhost:8080/api/counterparty');
  }

}
