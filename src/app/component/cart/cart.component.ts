import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems().map((item) => {
      return {
        ...item,
        price: Number(item.price),
      };
    });
    this.total = this.cartService.getCartTotal().toFixed(2);
  }

  onFormatPrice(price: number): string {
    return price.toFixed(2);
  }

  removeFromCart(id: string) {
    this.cartService.removeItem(id);
  }
}
