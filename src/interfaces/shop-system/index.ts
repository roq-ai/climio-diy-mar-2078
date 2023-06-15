import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ShopSystemInterface {
  id?: string;
  name: string;
  api_key: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  product?: ProductInterface[];
  user?: UserInterface;
  _count?: {
    product?: number;
  };
}

export interface ShopSystemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  api_key?: string;
  user_id?: string;
}
