import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SellerService } from '../services/seller.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const sellerService = inject(SellerService);

  const seller = localStorage.getItem('seller');
  const user = localStorage.getItem('user');

  if (seller || user) {
    return true;
  }

  return false;
};
