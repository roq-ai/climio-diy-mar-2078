import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProvisionInterface {
  id?: string;
  seller_id: string;
  category: string;
  price_range: string;
  percentage: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ProvisionGetQueryInterface extends GetQueryInterface {
  id?: string;
  seller_id?: string;
  category?: string;
  price_range?: string;
}
