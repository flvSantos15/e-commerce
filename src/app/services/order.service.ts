import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(orderData: IOrder) {
    // Criar um aviso de ordem criada e que falta o pagamento
    const order: IOrder = {
      ...orderData,
      status: 'pending',
    };

    return this.http.post('http://localhost:3000/orders', order);
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:3000/orders');
  }

  getOrderById(id: string): Observable<IOrder> {
    return this.http.get<IOrder>(`http://localhost:3000/orders/${id}`);
  }

  updateOrder(id: string, order: IOrder) {
    // Criar um aviso de ordem atualizada
    this.http.put(`http://localhost:3000/orders/${id}`, order);
  }

  cancelOrder(id: string) {
    // Criar um aviso de ordem cancelada
    this.http.put(`http://localhost:3000/orders/${id}`, {
      status: 'cancelled',
    });
  }

  deleteOrder(id: string) {
    // Criar um aviso de ordem deletada
    this.http.delete(`http://localhost:3000/orders/${id}`);
  }
}
