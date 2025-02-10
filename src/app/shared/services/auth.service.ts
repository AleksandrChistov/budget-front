import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { baseUrl } from '../consts/config.const';
import { User } from '../interfaces/user.interface';
import { buildQueryParams } from '../utils/http.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  getUserByEmail(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${baseUrl}/api/accesses${buildQueryParams({email, password})}`).pipe(
      map(users => users[0])
    );
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this.router.navigate(['login']);
  }
}
