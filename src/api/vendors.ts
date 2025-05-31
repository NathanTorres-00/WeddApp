import { fetchAPI } from './client';
import type { Vendor } from '../types/vendor';
import type { CreateVendorRequest, UpdateVendorRequest, APIResponse } from './types';

export const vendorsAPI = {
  getAll: async (): Promise<APIResponse<Vendor[]>> => {
    return fetchAPI<Vendor[]>('/vendors');
  },

  getById: async (id: string): Promise<APIResponse<Vendor>> => {
    return fetchAPI<Vendor>(`/vendors/${id}`);
  },

  create: async (data: CreateVendorRequest): Promise<APIResponse<Vendor>> => {
    return fetchAPI<Vendor>('/vendors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (data: UpdateVendorRequest): Promise<APIResponse<Vendor>> => {
    return fetchAPI<Vendor>(`/vendors/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<APIResponse<void>> => {
    return fetchAPI<void>(`/vendors/${id}`, {
      method: 'DELETE',
    });
  },
};