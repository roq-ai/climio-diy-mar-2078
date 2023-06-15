import { ProductInterface } from 'interfaces/product';
import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface OrderItemInterface {
  id?: string;
  quantity: number;
  product_id: string;
  order_id: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  order?: OrderInterface;
  _count?: {};
}

export interface OrderItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  order_id?: string;
}
