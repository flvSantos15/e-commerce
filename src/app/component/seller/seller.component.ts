import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent implements OnInit {
  public loading: boolean = false;
  public showLogin: boolean = false;
  public authError: string = '';
  public signUpForm: FormGroup;
  public signInForm: FormGroup;

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.sellerService.reloadSeller();
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['showLogin']) {
        this.showLogin = true;
      } else {
        this.showLogin = false;
      }
    });
  }

  onSignUp(): void {
    this.sellerService.signUp(this.signUpForm.value);

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.signUpForm.reset();
  }

  onLogin(): void {
    this.sellerService.login(this.signInForm.value);
    this.sellerService.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = 'Invalid email or password';
      }
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.signInForm.reset();
  }

  openLogin(): void {
    this.showLogin = true;
    this.router.navigate(['seller'], { queryParams: { showLogin: true } });
  }

  closeLogin(): void {
    this.showLogin = false;
    this.router.navigate(['seller']);
  }
}
