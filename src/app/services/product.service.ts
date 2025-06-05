import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(product: IProduct): Observable<void> {
    return this.http.post<void>('http://localhost:3000/products', product);
  }
}
