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
  public isLoading: boolean = false;
  public messageError: string = '';
  public messageSuccess: string = '';

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignUp() {
    this.isLoading = true;

    this.authService.signUp(this.signUpForm.value);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.signUpForm.reset();
  }
}
