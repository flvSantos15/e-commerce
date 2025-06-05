import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: IProduct[] | [] = [];
  isLoading: boolean = false;
  message: string = '';
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private productService: ProductService, private router: Router) {}

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

  handleRedirectToUpdateProduct(id: string): void {
    this.router.navigate(['/update-product', id]);
  }
}
