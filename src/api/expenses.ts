import { fetchAPI } from './client';
import type { ExpenseRequest, UpdateExpenseRequest, APIResponse } from './types';

interface Expense {
  id: number;
  amount: number;
  category: string;
  vendorName: string;
  date: string;
  description: string;
}

export const expensesAPI = {
  getAll: async (): Promise<APIResponse<Expense[]>> => {
    return fetchAPI<Expense[]>('/expenses');
  },

  getById: async (id: number): Promise<APIResponse<Expense>> => {
    return fetchAPI<Expense>(`/expenses/${id}`);
  },

  create: async (data: ExpenseRequest): Promise<APIResponse<Expense>> => {
    return fetchAPI<Expense>('/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (data: UpdateExpenseRequest): Promise<APIResponse<Expense>> => {
    return fetchAPI<Expense>(`/expenses/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<APIResponse<void>> => {
    return fetchAPI<void>(`/expenses/${id}`, {
      method: 'DELETE',
    });
  },
};