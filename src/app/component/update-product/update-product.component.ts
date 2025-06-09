import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoriesService } from '../../services/product-categories.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  message: string | null = null;
  productForm: FormGroup;
  isLoading: boolean = false;
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private productCategoriesService: ProductCategoriesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
    this.categories = this.productCategoriesService.getCategories();
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const productId = this.getProductId();
    this.productService.getProductById(productId).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  }

  getProductId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  handleUpdateProduct(): void {
    const productId = this.getProductId();
    this.isLoading = true;

    this.productService
      .updateProduct(productId, this.productForm.value)
      .subscribe((result) => {
        this.isLoading = false;
        this.message = 'Product updated successfully';
        this.productForm.reset();
        this.getProduct();

        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      });
  }
}
