import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { baseUrl } from '../consts/config.const';
import { User } from '../interfaces/user.interface';
import { buildQueryParams } from '../utils/http.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getUserByEmail(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${baseUrl}/api/accesses${buildQueryParams({email, password})}`).pipe(
      map(users => users[0])
    );
  }
}
