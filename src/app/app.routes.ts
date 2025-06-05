import { Routes } from '@angular/router';
import { AddProductComponent } from './component/add-product/add-product.component';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { SellerComponent } from './component/seller/seller.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent, canActivate: [authenticatedGuard] },
  { path: 'seller', component: SellerComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
    canActivate: [authenticatedGuard],
  },
  { path: '**', redirectTo: '' }, // Redirect to home for any unknown routes
];
