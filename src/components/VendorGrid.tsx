import React from 'react';
import { VendorCard } from './VendorCard';
import { Vendor } from '../types/vendor';
import { motion } from 'framer-motion';

interface VendorGridProps {
  vendors: Vendor[];
  onContact: (vendor: Vendor) => void;
  onSave: (vendor: Vendor) => void;
  onCompare: (vendor: Vendor) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const VendorGrid: React.FC<VendorGridProps> = ({
  vendors,
  onContact,
  onSave,
  onCompare,
}) => {
  if (vendors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg"
      >
        <h3 className="text-2xl font-medium text-gray-600 mb-3">No vendors found</h3>
        <p className="text-gray-500">
          Try adjusting your filters or search criteria
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {vendors.map((vendor) => (
        <motion.div key={vendor.id} variants={itemVariants}>
          <VendorCard
            vendor={vendor}
            onContact={onContact}
            onSave={onSave}
            onCompare={onCompare}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};