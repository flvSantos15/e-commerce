import { Routes } from '@angular/router';

import { AddProductComponent } from './component/add-product/add-product.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { OrderComponent } from './component/order/order.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { SearchComponent } from './component/search/search.component';
import { SellerHomeComponent } from './component/seller-home/seller-home.component';
import { SellerComponent } from './component/seller/seller.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'seller', component: SellerComponent },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authenticatedGuard],
  },
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
  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [authenticatedGuard],
  },
  { path: '**', redirectTo: '' }, // Redirect to home for any unknown routes
];
