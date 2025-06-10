import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';

interface CartItem extends IProduct {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor() {}

  addToCart(product: IProduct): void {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  removeItem(id: string): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(id: string): void {
    const item = this.cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(id: string): void {
    const item = this.cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  getCartItemsByProductId(id: string): CartItem[] {
    return this.cartItems.filter((item) => item.id === id);
  }
}
