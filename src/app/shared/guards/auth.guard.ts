import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => validateToken(false);

export const authAdminGuard: CanActivateFn = (route, state) => validateToken(true);

function validateToken(checkAdminRole: boolean) {
  const token = sessionStorage.getItem('auth');
  const router = inject(Router);

  if (!token) {
    return router.navigate(['login']);
  }

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp && decodedToken.exp > Date.now()) {
      return clearAuthToken(router);
    }

    const role = (decodedToken as any)?.roles[0].authority;

    inject(AuthService).setUser({
      token,
      role,
      username: decodedToken.sub as string,
    })

    return checkAdminRole ? validateAdminRole(role, router) : true;
  } catch (error) {
    console.error("Ошибка при декодировании токена:", error);
    return clearAuthToken(router);
  }
}

function validateAdminRole(role: string | undefined, router: Router) {
  if (role === 'ROLE_ADMIN') {
    return true;
  }

  return router.navigate(['reports']);
}

function clearAuthToken(router: Router) {
  sessionStorage.removeItem('auth');
  return router.navigate(['login']);
}
