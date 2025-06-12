import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { ProductService } from './product.service';

interface CartItem extends IProduct {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor(private productService: ProductService) {}

  getCartStorage(): CartItem[] {
    const cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
      return JSON.parse(cartStorage);
    }

    return [];
  }

  addToCart(product: IProduct, quantity: number): void {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }

    this.productService.getProductById(product.id!).subscribe({
      next: (productData) => {
        // verificar se a quantidade que foi passada existe em estoque
        if (quantity > productData.stock) {
          alert('Quantity exceeds stock');
          return;
        }

        const existingItem = this.cartItems.find(
          (item) => item.id === product.id
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
          this.cartItems.push({ ...productData, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
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
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
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
  }

  getCartItemsByProductId(id: string): CartItem[] {
    const cartStorage = this.getCartStorage();
    if (cartStorage) {
      this.cartItems = cartStorage;
    }
    return this.cartItems.filter((item) => item.id === id);
  }
}
