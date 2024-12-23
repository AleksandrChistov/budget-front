import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportsTotal } from '../interfaces/reports.interface';
import { ReportTypes } from '../enums/reports.enum';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http = inject(HttpClient);

  getTotals(type: ReportTypes, departmentId?: number, period?: Date[]): Observable<Array<ReportsTotal>> {
    const periodFrom = period?.[0]?.toISOString();
    const periodTo = period?.[1]?.toISOString();
    console.log('periodFrom', periodFrom);
    console.log('periodTo', periodTo);
    // TODO check departmentId ?? '' and periodFrom ?? '' and periodTo ?? '';
    return this.http.get<Array<ReportsTotal>>('https://mock.apidog.com/m1/755292-732507-default/reports/totals');
  }
}
