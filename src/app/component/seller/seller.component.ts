import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent implements OnInit {
  public loading: boolean = false;
  public sellerSignUpForm: FormGroup;

  constructor() {
    this.sellerSignUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  onSignUp(): void {
    console.log(this.sellerSignUpForm.value);

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.sellerSignUpForm.reset();
  }
}
