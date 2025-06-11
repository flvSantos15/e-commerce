import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IAuthSignInRequest, IAuthSignUpRequest } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(seller: IAuthSignUpRequest): void {
    this.http
      .post('http://localhost:3000/users', seller)
      .subscribe((result) => {
        if (result) {
          this.isLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(result));
          this.router.navigate(['']);
        }
      });
  }

  reloadSeller(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn.next(true);
      this.router.navigate(['']);
    }
  }

  login(user: IAuthSignInRequest): void {
    this.http
      .get(
        `http://localhost:3000/users?email=${user.email}&password=${user.password}`,
        { observe: 'response' }
      )
      .subscribe((result: HttpResponse<any>) => {
        if (result && result.body && result.body.length > 0) {
          this.isLoginError.emit(false);
          this.isLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
    this.router.navigate(['']);
  }
}
