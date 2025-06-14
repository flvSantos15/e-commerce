import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  total = 0;
  shippingForm: FormGroup;

  constructor(private cartService: CartService) {
    this.total = this.cartService.getCartTotal();

    this.shippingForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }

  handleCreateAddress() {
    console.log(this.shippingForm.value);
  }

  handleCreateOrder() {
    // criar a ordem
    // atualizar os produtos
    // limpar o carrinho
    // redirecionar para a pagina de pagamento (aqui posso colocar um gateway de pagamento)
  }
}
