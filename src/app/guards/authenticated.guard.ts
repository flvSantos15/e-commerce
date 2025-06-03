import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from '../services/seller.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const seller = localStorage.getItem('seller');

  if (seller) {
    return true;
  }

  return sellerService.isSellerLoggedIn.value;
};
