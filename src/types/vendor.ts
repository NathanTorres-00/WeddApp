export type VendorCategory = 'Venues' | 'Catering' | 'Photography' | 'Flowers' | 'Music' | 'Other';

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  rating: number;
  reviewCount: number;
  priceRange: PriceRange;
  description: string;
  matchScore: number;
  matchExplanation: string;
  location: {
    address: string;
    distance: number;
  };
  imageUrl: string;
  contactInfo: {
    email: string;
    phone: string;
  };
}

export interface FilterState {
  category: VendorCategory | 'All';
  budgetRange: [number, number];
  locationRadius: number;
  minRating: number;
  searchQuery: string;
} 