import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {
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
    this.authService.reloadSeller();
  }

  onSignUp(): void {
    this.authService.signUp(this.signUpForm.value);

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.signUpForm.reset();
  }

  onLogin(): void {
    this.authService.login(this.signInForm.value);
    this.authService.isLoginError.subscribe((error) => {
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
  }

  closeLogin(): void {
    this.showLogin = false;
  }
}
