import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  public product: IProduct | undefined;
  public quantity: number = 1;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    id &&
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
      });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    this.quantity > 1 && this.quantity--;
  }

  handleAddProductToCart(product: IProduct): void {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('User not logged in');
      return;
    }

    this.cartService.addToCart(product, this.quantity);
    alert('Product added to cart');
  }
}
