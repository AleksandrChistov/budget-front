import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AccessData, FormAccessData } from '../interfaces/form.interface';
import { baseUrl } from '../../../shared/consts/config.const';
import { LoadingService } from '../../../shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AccessesService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  get(): Observable<AccessData[]> {
    this.loadingService.load();
    return this.http.get<AccessData[]>(`${baseUrl}/api/accesses`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  create(accessData: FormAccessData): Observable<AccessData> {
    this.loadingService.load();
    return this.http.post<AccessData>(`${baseUrl}/api/accesses`, accessData).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  delete(id: number): Observable<void> {
    this.loadingService.load();
    return this.http.delete<void>(`${baseUrl}/api/accesses/${id}`).pipe(
      finalize(() => this.loadingService.stop())
    );
  }
}
