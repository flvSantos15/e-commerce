import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  total: string = '0';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartStorage();
    this.cartService.cartEmitter.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getCartTotal().toFixed(2);
    });
    this.total = this.cartService.getCartTotal().toFixed(2);
  }

  onFormatPrice(price: any): string {
    return Number(price).toFixed(2);
  }

  removeFromCart(id: string) {
    this.cartService.removeItem(id);
    this.cartService.cartEmitter.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getCartTotal().toFixed(2);
    });
  }

  handleRedirectToCheckoutPage() {
    this.router.navigate(['checkout']);
  }
}
