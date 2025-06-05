import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  public categories: string[] = [
    'keyboard',
    'mouse',
    'monitor',
    'headphone',
    'notebook',
    'smartphone',
    'tablet',
    'printer',
  ];

  constructor() {}

  getCategories(): string[] {
    return this.categories;
  }
}
