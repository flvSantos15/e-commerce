import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductCategoriesService } from '../../services/product-categories.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  public isLoading: boolean = false;
  public productForm: FormGroup;
  public message: string = '';
  public categories: string[] = [];

  constructor(
    private productService: ProductService,
    private productCategoriesService: ProductCategoriesService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.categories = this.productCategoriesService.getCategories();
  }

  handleCreateProduct(): void {
    this.isLoading = true;

    this.productService
      .createProduct(this.productForm.value)
      .subscribe((result) => {
        this.isLoading = false;
        this.message = 'Product added successfully';
      });

    this.productForm.reset();
  }
}
