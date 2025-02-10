import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { AccountOption, AccountResponse, BudgetItem } from '../../pages/transactions/interfaces/transaction.interface';
import { OptionName } from '../interfaces/option.interface';
import { BudgetTypes } from '../interfaces/budget-types.enum';
import { AccountTypes } from '../../pages/transactions/enums/account.enum';
import { TransactionTypes } from '../enums/transaction.enum';
import { buildQueryParams } from '../utils/http.util';
import { yearLabels } from '../../pages/reports/consts/years-labels.consts';
import { baseUrl } from '../consts/config.const';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  getBudgetNames(departmentId?: number, year: number = yearLabels[yearLabels.length - 1].id): Observable<OptionName<number>[]> {
    this.loadingService.load();
    return this.http.get<OptionName<number>[]>(`${baseUrl}/api/budgets/names${buildQueryParams({year, departmentId})}`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  getDepartments(): Observable<OptionName<number>[]> {
    this.loadingService.load();
    return this.http.get<OptionName<number>[]>(`${baseUrl}/api/departments`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  getAccounts(departmentId?: number): Observable<AccountOption[]> {
    this.loadingService.load();
    return this.http.get<AccountResponse[]>(`${baseUrl}/api/accounts${buildQueryParams({departmentId})}`)
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
        }),
        finalize(() => this.loadingService.stop())
      );
  }

  getBudgetItems(budgetType: BudgetTypes, transactionType: TransactionTypes): Observable<BudgetItem[]> {
    this.loadingService.load();
    return this.http.get<BudgetItem[]>(`${baseUrl}/api/budget-items${buildQueryParams({budgetType, transactionType})}`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  getCounterparties(): Observable<OptionName<number>[]> {
    this.loadingService.load();
    return this.http.get<OptionName<number>[]>(`${baseUrl}/api/counterparty`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

}
