import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { baseUrl } from '../consts/config.const';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { AuthUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private user = signal<AuthUser>({});

  login(body: {username: string, password: string}): Observable<AuthUser> {
    this.loadingService.load();
    return this.http.post<AuthUser>(
      `${baseUrl}/api/login`,
      body,
    ).pipe(
      finalize(() => this.loadingService.stop())
    );
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this.router.navigate(['login']);
  }

  setUser(user: AuthUser): void {
    this.user.set(user);
  }

  getUser(): AuthUser {
    return this.user();
  }
}
