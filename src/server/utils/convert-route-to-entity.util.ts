const mapping: Record<string, string> = {
  orders: 'order',
  'order-items': 'order_item',
  organizations: 'organization',
  products: 'product',
  provisions: 'provision',
  'shop-systems': 'shop_system',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
