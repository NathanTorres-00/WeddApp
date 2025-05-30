import React from 'react';
import { FilterState, VendorCategory } from '../types/vendor';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { glassMorphism } from '../utils/animations';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories: (VendorCategory | 'All')[] = ['All', 'Venues', 'Catering', 'Photography', 'Flowers', 'Music', 'Other'];
const locationRadii = [5, 10, 25, 50];
const ratingOptions = [3, 4, 4.5];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  isOpen,
  onClose,
}) => {
  const handleCategoryChange = (category: VendorCategory | 'All') => {
    onFilterChange({ ...filters, category });
  };

  const handleBudgetChange = (min: number, max: number) => {
    onFilterChange({ ...filters, budgetRange: [min, max] });
  };

  const handleLocationChange = (radius: number) => {
    onFilterChange({ ...filters, locationRadius: radius });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const handleClearFilters = () => {
    onFilterChange({
      category: 'All',
      budgetRange: [500, 10000],
      locationRadius: 25,
      minRating: 0,
      searchQuery: ''
    });
  };

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="fixed md:relative inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-lg shadow-lg"
          style={glassMorphism}
        >
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={onClose}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.label
                    key={category}
                    whileHover={{ x: 4 }}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 w-4 h-4"
                    />
                    {category}
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Budget Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  value={filters.budgetRange[1]}
                  onChange={(e) => handleBudgetChange(filters.budgetRange[0], parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium">${filters.budgetRange[1]}+</span>
              </div>
            </div>

            {/* Location Radius */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Location Radius</h3>
              <div className="grid grid-cols-2 gap-2">
                {locationRadii.map((radius) => (
                  <motion.button
                    key={radius}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLocationChange(radius)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      filters.locationRadius === radius
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {radius} miles
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Minimum Rating</h3>
              <div className="space-y-2">
                {ratingOptions.map((rating) => (
                  <motion.label
                    key={rating}
                    whileHover={{ x: 4 }}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="mr-2 w-4 h-4"
                    />
                    {rating}+ stars
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearFilters}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
            >
              Clear Filters
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 