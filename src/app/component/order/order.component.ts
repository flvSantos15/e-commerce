import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IOrder } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orders: IOrder[] = [
    {
      id: '1',
      userId: '1',
      items: [],
      totalAmount: 1230,
      status: 'pending',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      },
    },
    {
      id: '2',
      userId: '2',
      items: [],
      totalAmount: 1000,
      status: 'pending',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      },
    },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    // this.orderService.getOrders().subscribe((orders) => {
    //   this.orders = orders;
    // });
  }

  handleCancelOrder(id: string) {
    this.orderService.deleteOrder(id);
    this.orders = this.orders.filter((order) => order.id !== id);

    // devolver os produtos
    // colocar a ordem como cancelada
  }
}
