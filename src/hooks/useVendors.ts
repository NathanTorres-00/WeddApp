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

        if (filters.budgetRange) {
          query = query
            .gte('price_min', filters.budgetRange[0])
            .lte('price_max', filters.budgetRange[1]);
        }

        if (filters.minRating) {
          query = query.gte('rating', filters.minRating);
        }

        if (filters.locationRadius) {
          // Note: This is a simplified version. In production, you'd use PostGIS for proper radius search
          query = query.lte('location_distance', filters.locationRadius);
        }

        if (filters.searchQuery) {
          query = query.or(`name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        setVendors(data as Vendor[]);
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