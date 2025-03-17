import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { baseUrl } from '../consts/config.const';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  login(body: {username: string, password: string}): Observable<{token: string, username: string, role: string}> {
    this.loadingService.load();
    return this.http.post<{token: string, username: string, role: string}>(
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
}
