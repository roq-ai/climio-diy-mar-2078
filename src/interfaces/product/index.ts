import { OrderItemInterface } from 'interfaces/order-item';
import { ShopSystemInterface } from 'interfaces/shop-system';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  inventory: number;
  category: string;
  shop_system_id: string;
  created_at?: any;
  updated_at?: any;
  order_item?: OrderItemInterface[];
  shop_system?: ShopSystemInterface;
  _count?: {
    order_item?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  category?: string;
  shop_system_id?: string;
}
