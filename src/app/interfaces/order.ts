export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
}

export interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  address: IAddress;
}
