import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Vendor } from '../types/vendor';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';

export interface VendorFilters {
  category?: string;
  budgetRange?: [number, number];
  locationRadius?: number;
  minRating?: number;
  searchQuery?: string;
}

interface VendorRow {
  id: string;
  name: string;
  category: string;
  rating: number;
  review_count: number;
  price_range: string;
  description: string;
  match_score: number;
  match_explanation: string;
  location_address: string;
  location_distance: number;
  image_url: string;
  contact_email: string;
  contact_phone: string;
}

export function useVendors(filters: VendorFilters = {}) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('vendors')
          .select('*');

        // Apply filters
        if (filters.category && filters.category !== 'All') {
          query = query.eq('category', filters.category);
        }

        if (filters.minRating) {
          query = query.gte('rating', filters.minRating);
        }

        if (filters.locationRadius) {
          query = query.lte('location_distance', filters.locationRadius);
        }

        if (filters.searchQuery) {
          query = query.or(`name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        // Map database rows to frontend Vendor type
        const mappedVendors: Vendor[] = (data as VendorRow[]).map(row => ({
          id: row.id,
          name: row.name,
          category: row.category as VendorCategory,
          rating: row.rating,
          reviewCount: row.review_count,
          priceRange: row.price_range,
          description: row.description,
          matchScore: row.match_score,
          matchExplanation: row.match_explanation,
          location: {
            address: row.location_address,
            distance: row.location_distance
          },
          imageUrl: row.image_url,
          contactInfo: {
            email: row.contact_email,
            phone: row.contact_phone
          }
        }));

        setVendors(mappedVendors);
        setError(null);
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching vendors');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [filters]);

  return { vendors, loading, error };
}