import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessData } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class AccessesService {
  http = inject(HttpClient);

  get(): Observable<AccessData[]> {
    return this.http.get<AccessData[]>('https://mock.apidog.com/m1/755292-732507-default/accesses');
  }
}
