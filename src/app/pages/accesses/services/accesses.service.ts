import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessData, FormAccessData } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class AccessesService {
  http = inject(HttpClient);

  get(): Observable<AccessData[]> {
    return this.http.get<AccessData[]>('http://localhost:8080/api/accesses');
  }

  create(accessData: FormAccessData): Observable<AccessData> {
    return this.http.post<AccessData>('http://localhost:8080/api/accesses', accessData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/accesses/${id}`);
  }
}
