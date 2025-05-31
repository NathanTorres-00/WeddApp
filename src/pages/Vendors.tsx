import React, { useState } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { VendorGrid } from '../components/VendorGrid';
import { useVendors, VendorFilters } from '../hooks/useVendors';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Toast } from '../components/shared/Toast';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '../hooks/useWindowSize';

export const Vendors: React.FC = () => {
  const [filters, setFilters] = useState<VendorFilters>({
    category: 'All',
    budgetRange: [500, 10000],
    locationRadius: 25,
    minRating: 0,
    searchQuery: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const { vendors, loading, error } = useVendors(filters);
  const { width, height } = useWindowSize();

  const handleFilterChange = (newFilters: Partial<VendorFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Toast />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Find Vendors
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vendors..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 border rounded-lg hover:bg-gray-100 bg-white/70 backdrop-blur-sm"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="lg\" color="#3B82F6" />
              </div>
            ) : (
              <VendorGrid
                vendors={vendors}
                onContact={(vendor) => console.log('Contact:', vendor)}
                onSave={(vendor) => console.log('Save:', vendor)}
                onCompare={(vendor) => console.log('Compare:', vendor)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};