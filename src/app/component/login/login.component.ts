import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public signUpForm: FormGroup;
  public signInForm: FormGroup;
  public showLoginForm: boolean = false;
  public isLoading: boolean = false;
  public messageError: string = '';
  public messageSuccess: string = '';

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

  openLoginForm() {
    this.showLoginForm = true;
  }

  closeLoginForm() {
    this.showLoginForm = false;
  }

  onSignUp() {
    this.isLoading = true;

    this.authService.signUp(this.signUpForm.value);
    this.authService.isLoginError.subscribe((error) => {
      if (error) {
        this.messageError = 'Invalid email or password';

        setTimeout(() => {
          this.messageError = '';
        }, 4000);
      }
    });

    this.signUpForm.reset();
  }

  onSignIn() {
    this.isLoading = true;

    this.authService.login(this.signInForm.value);
    this.authService.isLoginError.subscribe((error) => {
      if (error) {
        this.messageError = 'Invalid email or password';

        setTimeout(() => {
          this.messageError = '';
        }, 4000);
      } else {
        this.messageSuccess = 'Login successful';
      }
    });

    this.signInForm.reset();
  }
}
