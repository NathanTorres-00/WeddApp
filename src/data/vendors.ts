import { Vendor } from '../types/vendor';

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Grand Ballroom',
    category: 'Venues',
    rating: 4.8,
    reviewCount: 245,
    priceRange: '$$$$',
    description: 'Luxury ballroom with crystal chandeliers',
    matchScore: 95,
    matchExplanation: 'Within budget, Modern style, 2 miles away',
    location: {
      address: '123 Luxury Lane, Downtown',
      distance: 2
    },
    imageUrl: '/images/venues/grand-ballroom.jpg',
    contactInfo: {
      email: 'info@grandballroom.com',
      phone: '(555) 123-4567'
    }
  },
  {
    id: 'v2',
    name: 'Garden Oaks Estate',
    category: 'Venues',
    rating: 4.6,
    reviewCount: 189,
    priceRange: '$$$',
    description: 'Rustic outdoor venue with gardens',
    matchScore: 78,
    matchExplanation: 'Within budget, Rustic style, 5 miles away',
    location: {
      address: '456 Garden Road, Suburbs',
      distance: 5
    },
    imageUrl: '/images/venues/garden-oaks.jpg',
    contactInfo: {
      email: 'events@gardenoaks.com',
      phone: '(555) 234-5678'
    }
  },
  {
    id: 'v3',
    name: 'Downtown Loft',
    category: 'Venues',
    rating: 4.4,
    reviewCount: 156,
    priceRange: '$$',
    description: 'Modern industrial space',
    matchScore: 65,
    matchExplanation: 'Budget friendly, Industrial style, 1 mile away',
    location: {
      address: '789 Urban Street, Downtown',
      distance: 1
    },
    imageUrl: '/images/venues/downtown-loft.jpg',
    contactInfo: {
      email: 'book@downtownloft.com',
      phone: '(555) 345-6789'
    }
  },
  {
    id: 'v4',
    name: 'Emma Photography',
    category: 'Photography',
    rating: 4.9,
    reviewCount: 312,
    priceRange: '$$$',
    description: 'Modern wedding specialist',
    matchScore: 92,
    matchExplanation: 'Premium quality, Modern style, 3 miles away',
    location: {
      address: '321 Photo Lane, Arts District',
      distance: 3
    },
    imageUrl: '/images/photography/emma-photo.jpg',
    contactInfo: {
      email: 'hello@emmaphoto.com',
      phone: '(555) 456-7890'
    }
  },
  {
    id: 'v5',
    name: 'Classic Captures',
    category: 'Photography',
    rating: 4.7,
    reviewCount: 278,
    priceRange: '$$',
    description: 'Traditional wedding photos',
    matchScore: 85,
    matchExplanation: 'Traditional style, 4 miles away',
    location: {
      address: '654 Memory Road, Old Town',
      distance: 4
    },
    imageUrl: '/images/photography/classic-captures.jpg',
    contactInfo: {
      email: 'info@classiccaptures.com',
      phone: '(555) 567-8901'
    }
  },
  {
    id: 'v6',
    name: 'Elegant Eats',
    category: 'Catering',
    rating: 4.8,
    reviewCount: 198,
    priceRange: '$$$$',
    description: 'Fine dining wedding catering',
    matchScore: 88,
    matchExplanation: 'Premium service, Fine dining, 2 miles away',
    location: {
      address: '987 Gourmet Avenue, Downtown',
      distance: 2
    },
    imageUrl: '/images/catering/elegant-eats.jpg',
    contactInfo: {
      email: 'events@eleganteats.com',
      phone: '(555) 678-9012'
    }
  },
  {
    id: 'v7',
    name: 'Farm to Table Co',
    category: 'Catering',
    rating: 4.5,
    reviewCount: 167,
    priceRange: '$$$',
    description: 'Organic local cuisine',
    matchScore: 72,
    matchExplanation: 'Organic options, Local ingredients, 6 miles away',
    location: {
      address: '741 Farm Road, Countryside',
      distance: 6
    },
    imageUrl: '/images/catering/farm-to-table.jpg',
    contactInfo: {
      email: 'catering@farmtotable.com',
      phone: '(555) 789-0123'
    }
  }
]; 