import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  popularProducts: IProduct[] = [];
  trendyProducts: IProduct[] = [];
  currentSlide = 0;
  isLoading = false;
  private carouselInterval: Subscription | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadPopularProducts();
    this.loadTrendyProducts();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      this.carouselInterval.unsubscribe();
    }
  }

  private loadPopularProducts(): void {
    this.isLoading = true;
    this.productService.getPopularProducts().subscribe({
      next: (products) => {
        this.popularProducts = products;
        this.isLoading = false;
        if (products.length > 0) {
          this.startCarousel();
        }
      },
      error: (error) => {
        console.error('Error loading popular products:', error);
        this.isLoading = false;
      },
    });
  }

  private loadTrendyProducts(): void {
    this.isLoading = true;
    this.productService.getTrendyProducts().subscribe({
      next: (products) => {
        this.trendyProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading trendy products:', error);
        this.isLoading = false;
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

  handleRedirectToProductDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  handleAddProductToCart(product: IProduct): void {
    // chamar servico de adicionar produto ao carrinho
    // no servico vou adicionar esse produto em localStorage
    this.router.navigate(['cart']);
  }
}
