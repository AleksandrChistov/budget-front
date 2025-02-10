import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Reports } from '../interfaces/reports.interface';
import { TransactionTypes } from '../../../shared/enums/transaction.enum';
import { buildQueryParams } from '../../../shared/utils/http.util';
import { yearLabels } from '../consts/years-labels.consts';
import { baseUrl } from '../../../shared/consts/config.const';
import { LoadingService } from '../../../shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  get(type = TransactionTypes.EXPENSE, year = yearLabels[yearLabels.length - 1].id, budgetId: number): Observable<Reports> {
    console.log('transactionType', type);
    console.log('year', year);
    console.log('budgetId', budgetId);
    this.loadingService.load();
    return this.http.get<Reports>(`${baseUrl}/api/reports${buildQueryParams({type, year, budgetId})}`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

}
