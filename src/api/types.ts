export interface APIResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface APIError {
  message: string;
  code: string;
  status: number;
}

// Vendor API Types
export interface CreateVendorRequest {
  name: string;
  category: string;
  description: string;
  priceRange: string;
  location: {
    address: string;
    distance: number;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
}

export interface UpdateVendorRequest extends Partial<CreateVendorRequest> {
  id: string;
}

// Budget API Types
export interface ExpenseRequest {
  amount: number;
  category: string;
  vendorName: string;
  date: string;
  description: string;
}

export interface UpdateExpenseRequest extends Partial<ExpenseRequest> {
  id: number;
}