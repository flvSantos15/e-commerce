import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IOrderItem {
  productId: string;
  quantity: number;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  address: IAddress;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order: IOrder) {
    // Criar um aviso de ordem criada e que falta o pagamento
    return this.http.post('http://localhost:3000/orders', order);
  }

  getOrders() {
    return this.http.get('http://localhost:3000/orders');
  }

  getOrderById(id: string) {
    return this.http.get(`http://localhost:3000/orders/${id}`);
  }

  updateOrder(id: string, order: IOrder) {
    // Criar um aviso de ordem atualizada
    return this.http.put(`http://localhost:3000/orders/${id}`, order);
  }

  deleteOrder(id: string) {
    // Criar um aviso de ordem deletada
    return this.http.delete(`http://localhost:3000/orders/${id}`);
  }
}
