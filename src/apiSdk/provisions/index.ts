import axios from 'axios';
import queryString from 'query-string';
import { ProvisionInterface, ProvisionGetQueryInterface } from 'interfaces/provision';
import { GetQueryInterface } from '../../interfaces';

export const getProvisions = async (query?: ProvisionGetQueryInterface) => {
  const response = await axios.get(`/api/provisions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProvision = async (provision: ProvisionInterface) => {
  const response = await axios.post('/api/provisions', provision);
  return response.data;
};

export const updateProvisionById = async (id: string, provision: ProvisionInterface) => {
  const response = await axios.put(`/api/provisions/${id}`, provision);
  return response.data;
};

export const getProvisionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/provisions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProvisionById = async (id: string) => {
  const response = await axios.delete(`/api/provisions/${id}`);
  return response.data;
};
