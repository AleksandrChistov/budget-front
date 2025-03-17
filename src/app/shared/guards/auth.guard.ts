import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // todo: think how to improve token validation
  if (['undefined', 'null', ''].includes(sessionStorage.getItem('auth') || '')) {
    const router = inject(Router);
    return router.navigate(['login']);
  }
    return true;
};
