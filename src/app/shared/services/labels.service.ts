import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetTypes } from '../../pages/budgets/enums/budget.enum';
import { Observable } from 'rxjs';
import { Option } from '../interfaces/option.interface';

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

}
