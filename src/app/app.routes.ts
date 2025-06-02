import { Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }, // Redirect to home for any unknown routes
];
