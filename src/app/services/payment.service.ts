import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  PIX = 'pix',
}

enum PaymentStatus {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  PENDING = 'pending',
  EXPIRED = 'expired',
  REVERSED = 'reversed',
}

interface IPayment {
  amount: number;
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPayment(payment: IPayment): Observable<void> {
    // A regra fica na API e nao aqui
    return this.http.post<void>('http://localhost:3000/payments', payment);
  }
}
