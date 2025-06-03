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
  imports: [ReactiveFormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent implements OnInit {
  public loading: boolean = false;
  public sellerSignUpForm: FormGroup;

  constructor(private sellerService: SellerService) {
    this.sellerSignUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
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
}
