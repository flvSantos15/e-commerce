import { EventEmitter, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { ProductService } from './product.service';

export interface CartItem extends IProduct {
  quantity: number;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  cartEmitter = new EventEmitter<CartItem[]>();

  constructor(private productService: ProductService) {}

  getCartStorage(): CartItem[] {
    const cartStorage = localStorage.getItem('cart');
    const userStorage = localStorage.getItem('user');
    const userId = userStorage ? JSON.parse(userStorage).id : null;
    const cartParsed = cartStorage ? JSON.parse(cartStorage) : [];

    if (!userId) {
      return [];
    }

    return cartParsed.filter((item: CartItem) => item.userId === userId);
  }

  addToCart(productId: string, quantity: number, userId: string): void {
    if (!userId) {
      alert('User not logged in');
      return;
    }

    if (!productId) {
      alert('Product ID is required');
      return;
    }

    if (!quantity) {
      alert('Quantity is required');
      return;
    }

    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }

    this.productService.getProductById(productId).subscribe({
      next: (productData) => {
        // verificar se a quantidade que foi passada existe em estoque
        if (quantity > productData.stock) {
          alert('Quantity exceeds stock');
          return;
        }

        const existingItem = this.cartItems.find(
          (item) => item.id === productId
        );

        if (existingItem) {
          // If the total quantity would exceed stock, adjust to max available
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity > productData.stock) {
            existingItem.quantity = productData.stock;
            alert(
              `Adjusted quantity to maximum available stock (${productData.stock})`
            );
          } else {
            existingItem.quantity = newQuantity;
          }
        } else {
          this.cartItems.push({ ...productData, quantity, userId });
        }

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartEmitter.emit(this.cartItems);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        alert('Error adding product to cart. Please try again.');
      },
    });
  }

  getCartItems(): CartItem[] {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }

    return this.cartItems;
  }

  removeItem(id: string): void {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartEmitter.emit(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartEmitter.emit(this.cartItems);
  }

  getCartCount(): number {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getCartTotal(): number {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(id: string): void {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }
    const item = this.cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartEmitter.emit(this.cartItems);
  }

  decreaseQuantity(id: string): void {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }
    const item = this.cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartEmitter.emit(this.cartItems);
  }
}
