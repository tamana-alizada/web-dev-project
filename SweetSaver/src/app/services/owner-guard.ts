import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const ownerGuard: CanActivateFn = () => {
  const router = inject(Router);

  const savedProfile = localStorage.getItem('user_role');

  if (savedProfile === 'owner') {
    return true;
  }

  return router.createUrlTree(['/sign-in']);
};