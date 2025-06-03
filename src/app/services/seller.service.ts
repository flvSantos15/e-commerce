import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface ISellerSignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface ISellerLoginRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(seller: ISellerSignUpRequest): void {
    this.http
      .post('http://localhost:3000/seller', seller)
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
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

  login(seller: ISellerLoginRequest): void {
    this.http
      .get(
        `http://localhost:3000/seller?email=${seller.email}&password=${seller.password}`,
        { observe: 'response' }
      )
      .subscribe((result: HttpResponse<any>) => {
        if (result && result.body && result.body.length > 0) {
          this.isLoginError.emit(false);
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body[0]));
          this.router.navigate(['/seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
