import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessData, FormAccessData } from '../interfaces/form.interface';
import { baseUrl } from '../../../shared/consts/config.const';

@Injectable({
  providedIn: 'root'
})
export class AccessesService {
  http = inject(HttpClient);

  get(): Observable<AccessData[]> {
    return this.http.get<AccessData[]>(`${baseUrl}/api/accesses`);
  }

  create(accessData: FormAccessData): Observable<AccessData> {
    return this.http.post<AccessData>(`${baseUrl}/api/accesses`, accessData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/api/accesses/${id}`);
  }
}
