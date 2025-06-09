import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, interval } from 'rxjs';
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
  products: IProduct[] = [];
  popularProducts: IProduct[] = [];
  currentSlide = 0;
  isLoading = false;
  message = '';
  faTrash = faTrash;
  faEdit = faEdit;
  private carouselInterval: Subscription | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.loadPopularProducts();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
  }

  private loadPopularProducts(): void {
    this.productService.getPopularProducts().subscribe({
      next: (products) => {
        this.popularProducts = products;
        if (products.length > 0) {
          this.startCarousel();
        }
      },
      error: (error) => {
        console.error('Error loading popular products:', error);
      },
    });
  }

  private startCarousel(): void {
    // Limpa o intervalo existente, se houver
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }

    // Inicia um novo intervalo
    this.carouselInterval = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide(): void {
    if (this.popularProducts.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.popularProducts.length;
    }
  }

  selectSlide(index: number): void {
    this.currentSlide = index;
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
