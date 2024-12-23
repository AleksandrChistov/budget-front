import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BudgetTypes } from '../../pages/budgets/enums/budget.enum';
import { ReportTypes } from '../../pages/reports/enums/reports.enum';
import { Option } from '../interfaces/option.interface';
import { AccountOption, AccountResponse, BudgetItem } from '../../pages/transactions/interfaces/transaction.interface';
import { AccountTypes } from '../../pages/transactions/enums/account.enum';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  http = inject(HttpClient);

  getBudgets(type: BudgetTypes, departmentId?: number): Observable<Array<Option<number>>> {
    // TODO check departmentId ?? '';
    return this.http.get<Array<Option<number>>>('https://mock.apidog.com/m2/755292-732507-default/12524306');
  }

  getDepartments(): Observable<Array<Option<number>>> {
    return this.http.get<Array<Option<number>>>('https://mock.apidog.com/m2/755292-732507-default/12694270');
  }

  getReportTypes(): Observable<Array<Option<ReportTypes>>> {
    return this.http.get<Array<Option<ReportTypes>>>('https://mock.apidog.com/m2/755292-732507-default/12695232');
  }

  getAccounts(departmentId?: number): Observable<Array<AccountOption>> {
    // TODO: check departmentId ?? '';
    return this.http.get<Array<AccountResponse>>('https://mock.apidog.com/m2/755292-732507-default/12695279')
      .pipe(
        map((accounts: Array<AccountResponse>) => {
          const bank = {
            title: 'Банковский',
            icon: 'id-card',
            children: [] as Array<Option<number>>,
          }
          const cash = {
            title: 'Наличные',
            icon: 'money-bill',
            children: [] as Array<Option<number>>,
          }
          accounts.forEach(({ type, id, label }) => {
            if (type === AccountTypes.BANK) {
              bank.children.push({ id, label });
            } else {
              cash.children.push({ id, label });
            }
          });
          return [bank, cash];
        })
      );
  }

  getBudgetTypes(): Observable<Array<Option<BudgetTypes>>> {
    return this.http.get<Array<Option<BudgetTypes>>>('https://mock.apidog.com/m2/755292-732507-default/12711008');
  }

  getBudgetItems(budgetType: BudgetTypes): Observable<Array<BudgetItem>> {
    // TODO: argument budgetType is required
    return this.http.get<Array<BudgetItem>>('https://mock.apidog.com/m2/755292-732507-default/12711186');
  }

  getCounterparties(): Observable<Array<Option<number>>> {
    return this.http.get<Array<Option<number>>>('https://mock.apidog.com/m2/755292-732507-default/12711482');
  }

}
