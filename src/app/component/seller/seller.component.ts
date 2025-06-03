import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  public sellerSignUpForm: FormGroup;
  public sellerLoginForm: FormGroup;

  constructor(private sellerService: SellerService) {
    this.sellerSignUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.sellerLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.sellerService.reloadSeller();
  }

  onSignUp(): void {
    this.sellerService.signUp(this.sellerSignUpForm.value);

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.sellerSignUpForm.reset();
  }

  onLogin(): void {
    this.sellerService.login(this.sellerLoginForm.value);
    this.sellerService.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = 'Invalid email or password';
      }
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.sellerLoginForm.reset();
  }

  openLogin(): void {
    this.showLogin = true;
  }

  closeLogin(): void {
    this.showLogin = false;
  }
}
