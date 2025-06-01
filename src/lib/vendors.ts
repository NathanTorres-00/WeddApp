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
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select()
      .eq('vendor_id', vendorId)
      .eq('user_id', user.user.id)
      .single();

    if (existingFavorite) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('vendor_id', vendorId)
        .eq('user_id', user.user.id);
      
      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ 
          vendor_id: vendorId,
          user_id: user.user.id,
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
}

export async function getFavorites(): Promise<string[]> {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('favorites')
      .select('vendor_id')
      .eq('user_id', user.user.id);

    if (error) throw error;
    return data.map(f => f.vendor_id);
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

export async function sendVendorInquiry(vendorId: string, message: string): Promise<void> {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('vendor_inquiries')
      .insert({ 
        vendor_id: vendorId, 
        user_id: user.user.id,
        message,
        status: 'pending',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error sending inquiry:', error);
    throw error;
  }
}

export async function getVendorInquiries() {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data, error } = await supabase
      .from('vendor_inquiries')
      .select(`
        *,
        vendors:vendor_id (
          name,
          category,
          contact_info
        )
      `)
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting inquiries:', error);
    return [];
  }
}