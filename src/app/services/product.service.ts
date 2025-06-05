import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(product: IProduct): Observable<void> {
    return this.http.post<void>('http://localhost:3000/products', product);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products');
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/products/${id}`);
  }
}
