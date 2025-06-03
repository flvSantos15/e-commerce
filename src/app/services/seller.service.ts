import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface ISeller {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(seller: ISeller): void {
    this.http
      .post('http://localhost:3000/seller', seller)
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          console.log(result);
          localStorage.setItem('seller', JSON.stringify(result));
          this.router.navigate(['/seller-home']);
        }
      });
  }

  reloadSeller(): void {
    const seller = localStorage.getItem('seller');
    if (seller) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
}
