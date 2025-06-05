import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: IProduct[] | [] = [];
  isLoading: boolean = false;
  message: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  handleDeleteProduct(id: string): void {
    this.isLoading = true;
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
      this.isLoading = false;
      this.message = 'Product deleted successfully';
      this.getProducts();
    });
  }
}
