import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.params['query'];

    query &&
      this.productService.searchProduct(query).subscribe((products) => {
        this.products = products;
      });
  }

  handleRedirectToProductDetails(id: string): void {
    this.router.navigate(['/details', id]);
  }
}
