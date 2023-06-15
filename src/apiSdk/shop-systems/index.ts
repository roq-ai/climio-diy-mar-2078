import axios from 'axios';
import queryString from 'query-string';
import { ShopSystemInterface, ShopSystemGetQueryInterface } from 'interfaces/shop-system';
import { GetQueryInterface } from '../../interfaces';

export const getShopSystems = async (query?: ShopSystemGetQueryInterface) => {
  const response = await axios.get(`/api/shop-systems${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createShopSystem = async (shopSystem: ShopSystemInterface) => {
  const response = await axios.post('/api/shop-systems', shopSystem);
  return response.data;
};

export const updateShopSystemById = async (id: string, shopSystem: ShopSystemInterface) => {
  const response = await axios.put(`/api/shop-systems/${id}`, shopSystem);
  return response.data;
};

export const getShopSystemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shop-systems/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShopSystemById = async (id: string) => {
  const response = await axios.delete(`/api/shop-systems/${id}`);
  return response.data;
};
