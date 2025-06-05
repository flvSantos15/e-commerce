import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  public categories: string[] = ['keyboard', 'mouse', 'monitor'];

  constructor() {}

  getCategories(): string[] {
    return this.categories;
  }
}
