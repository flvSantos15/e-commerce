import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  getSellers(): Observable<any> {
    return this.http.get('http://localhost:3000/seller');
  }

  getSellerInfo(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/seller?email=${email}`);
  }
}
