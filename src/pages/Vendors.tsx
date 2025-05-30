import React, { useState, useEffect } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { VendorGrid } from '../components/VendorGrid';
import { Vendor, FilterState } from '../types/vendor';
import { vendors as mockVendors } from '../data/vendors';
import { Search, SlidersHorizontal, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from '../components/shared/Toast';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '../hooks/useWindowSize';

export const Vendors: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    budgetRange: [500, 10000],
    locationRadius: 25,
    minRating: 0,
    searchQuery: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [savedVendors, setSavedVendors] = useState<Vendor[]>([]);
  const [compareVendors, setCompareVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContact = (vendor: Vendor) => {
    // Implement contact functionality
    console.log('Contact vendor:', vendor.name);
  };

  const handleSave = (vendor: Vendor) => {
    if (savedVendors.some((v) => v.id === vendor.id)) {
      setSavedVendors(savedVendors.filter((v) => v.id !== vendor.id));
    } else {
      setSavedVendors([...savedVendors, vendor]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleCompare = (vendor: Vendor) => {
    if (compareVendors.some((v) => v.id === vendor.id)) {
      setCompareVendors(compareVendors.filter((v) => v.id !== vendor.id));
    } else if (compareVendors.length < 3) {
      setCompareVendors([...compareVendors, vendor]);
    }
  };

  const filteredVendors = mockVendors.filter((vendor) => {
    if (filters.category !== 'All' && vendor.category !== filters.category) {
      return false;
    }
    if (vendor.rating < filters.minRating) {
      return false;
    }
    if (vendor.location.distance > filters.locationRadius) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <LoadingSpinner size="lg" color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Toast />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
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
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 border rounded-lg hover:bg-gray-100 bg-white/70 backdrop-blur-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Vendor Grid */}
          <div className="flex-1">
            <AnimatePresence>
              {compareVendors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/70 backdrop-blur-sm p-4 rounded-lg mb-6 shadow-lg"
                >
                  <h3 className="font-medium mb-2">
                    Comparing {compareVendors.length} vendors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {compareVendors.map((vendor) => (
                      <motion.div
                        key={vendor.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm"
                      >
                        <span className="mr-2">{vendor.name}</span>
                        <button
                          onClick={() => handleCompare(vendor)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <VendorGrid
              vendors={filteredVendors}
              onContact={handleContact}
              onSave={handleSave}
              onCompare={handleCompare}
            />
          </div>
        </div>
      </div>
    </div>
  );
};