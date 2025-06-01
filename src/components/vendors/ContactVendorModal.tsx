import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Send } from 'lucide-react';
import { Vendor } from '../../types/vendor';
import { sendVendorInquiry } from '../../lib/vendors';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import toast from 'react-hot-toast';

interface ContactVendorModalProps {
  vendor: Vendor;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactVendorModal({ vendor, isOpen, onClose }: ContactVendorModalProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendVendorInquiry(vendor.id, message);
      toast.success('Message sent successfully!');
      onClose();
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <Dialog.Title className="text-xl font-semibold text-gray-800">
              Contact {vendor.name}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the vendor about your wedding plans and what you're looking for..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors flex items-center"
              >
                {loading ? (
                  <LoadingSpinner size="sm\" color="#ffffff" />
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}