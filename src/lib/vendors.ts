import { supabase } from './supabase';
import { Vendor } from '../types/vendor';

export async function checkTables() {
  try {
    // Check favorites table
    const { data: favoritesData, error: favoritesError } = await supabase
      .from('favorites')
      .select('*')
      .limit(1);

    if (favoritesError) {
      throw new Error('Favorites table not found or inaccessible');
    }

    // Check vendor_inquiries table
    const { data: inquiriesData, error: inquiriesError } = await supabase
      .from('vendor_inquiries')
      .select('*')
      .limit(1);

    if (inquiriesError) {
      throw new Error('Vendor inquiries table not found or inaccessible');
    }

    return true;
  } catch (error) {
    console.error('Error checking tables:', error);
    return false;
  }
}

export async function toggleFavorite(vendorId: string): Promise<boolean> {
  const { data: existingFavorite } = await supabase
    .from('favorites')
    .select()
    .eq('vendor_id', vendorId)
    .single();

  if (existingFavorite) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('vendor_id', vendorId);
    
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from('favorites')
      .insert({ vendor_id: vendorId });
    
    if (error) throw error;
    return true;
  }
}

export async function getFavorites(): Promise<string[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('vendor_id');

  if (error) throw error;
  return data.map(f => f.vendor_id);
}

export async function sendVendorInquiry(vendorId: string, message: string): Promise<void> {
  const { error } = await supabase
    .from('vendor_inquiries')
    .insert({ vendor_id: vendorId, message });

  if (error) throw error;
}