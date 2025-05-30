import React from 'react';
import { Vendor } from '../types/vendor';
import { Star, MapPin, Heart, MessageSquare, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardHover, glassMorphism } from '../utils/animations';
import toast from 'react-hot-toast';

interface VendorCardProps {
  vendor: Vendor;
  onContact: (vendor: Vendor) => void;
  onSave: (vendor: Vendor) => void;
  onCompare: (vendor: Vendor) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  onContact,
  onSave,
  onCompare,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSave = () => {
    onSave(vendor);
    toast.success(`${vendor.name} saved to favorites!`);
  };

  const handleCompare = () => {
    onCompare(vendor);
    toast.success(`${vendor.name} added to comparison!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white/70 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden border border-white/20"
      style={glassMorphism}
    >
      {/* Vendor Image */}
      <div className="relative h-48">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={vendor.imageUrl}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {vendor.priceRange}
        </div>
      </div>

      {/* Vendor Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{vendor.name}</h3>
          <div className="flex items-center">
            {renderStars(vendor.rating)}
            <span className="ml-1 text-sm text-gray-600">
              ({vendor.reviewCount})
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3">{vendor.description}</p>

        {/* Match Score */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50/80 backdrop-blur-sm p-3 rounded-lg mb-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-blue-700 font-medium">
              {vendor.matchScore}% Match
            </span>
            <span className="text-sm text-blue-600">{vendor.matchExplanation}</span>
          </div>
        </motion.div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {vendor.location.distance} miles away
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onContact(vendor)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center shadow-sm"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Contact
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-gray-100"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCompare}
            className="p-2 text-gray-600 hover:text-blue-500 rounded-lg hover:bg-gray-100"
          >
            <BarChart2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}; 