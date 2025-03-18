import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Card,
    Button,
    InputText,
    Toast
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  msgService = inject(MessageService);

  loginForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { email, password } = this.loginForm.getRawValue();
    this.authService.login({ username: email, password }).pipe(
      tap(user => {
        if (!user) {
          throw new Error("Email или пароль введены неверно");
        }
        sessionStorage.setItem('auth', user.token || '');
        this.router.navigate(['/reports']);
      }),
      catchError(error => {
        this.msgService.add({ severity: 'error', summary: 'Ошибка доступа', detail: error.error });
        return EMPTY;
      })
    ).subscribe();
  }
}
