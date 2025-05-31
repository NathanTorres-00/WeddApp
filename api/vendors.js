// api/vendors.js
const vendors = [
    {
      id: 1,
      name: "Elegant Events Photography",
      category: "photographer",
      location: "Los Angeles, CA",
      priceRange: "$2000-$4000",
      rating: 4.8,
      description: "Professional wedding photography with a modern artistic style",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400"
      ],
      contactInfo: {
        email: "info@elegantevents.com",
        phone: "(555) 123-4567",
        website: "https://elegantevents.com"
      },
      tags: ["outdoor", "indoor", "destination", "engagement"],
      availability: ["2025-06-01", "2025-07-15", "2025-08-20"],
      matchScore: 95
    },
    {
      id: 2,
      name: "Bloom & Blossom Florists",
      category: "florist",
      location: "Beverly Hills, CA",
      priceRange: "$800-$2500",
      rating: 4.9,
      description: "Luxury floral designs for unforgettable weddings",
      images: [
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
        "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400"
      ],
      contactInfo: {
        email: "hello@bloomandblossom.com",
        phone: "(555) 987-6543",
        website: "https://bloomandblossom.com"
      },
      tags: ["roses", "peonies", "modern", "rustic"],
      availability: ["2025-05-15", "2025-06-20", "2025-09-10"],
      matchScore: 88
    },
    {
      id: 3,
      name: "Harmony Strings Quartet",
      category: "music",
      location: "Santa Monica, CA",
      priceRange: "$1200-$2000",
      rating: 4.7,
      description: "Classical and contemporary music for ceremony and reception",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400"
      ],
      contactInfo: {
        email: "bookings@harmonystrings.com",
        phone: "(555) 456-7890",
        website: "https://harmonystrings.com"
      },
      tags: ["classical", "contemporary", "acoustic", "ceremony"],
      availability: ["2025-06-14", "2025-07-28", "2025-08-15"],
      matchScore: 92
    }
  ];
  
  export default function handler(req, res) {
    const { method, query } = req;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'GET') {
      let filteredVendors = [...vendors];
      
      if (query.category && query.category !== 'all') {
        filteredVendors = filteredVendors.filter(
          vendor => vendor.category.toLowerCase() === query.category.toLowerCase()
        );
      }
      
      if (query.location) {
        filteredVendors = filteredVendors.filter(
          vendor => vendor.location.toLowerCase().includes(query.location.toLowerCase())
        );
      }
      
      if (query.maxPrice) {
        const maxPrice = parseInt(query.maxPrice);
        filteredVendors = filteredVendors.filter(vendor => {
          const priceMatch = vendor.priceRange.match(/\$(\d+)-\$(\d+)/);
          if (priceMatch) {
            const vendorMaxPrice = parseInt(priceMatch[2]);
            return vendorMaxPrice <= maxPrice;
          }
          return true;
        });
      }
      
      if (query.minRating) {
        const minRating = parseFloat(query.minRating);
        filteredVendors = filteredVendors.filter(
          vendor => vendor.rating >= minRating
        );
      }
      
      const sortBy = query.sortBy || 'matchScore';
      filteredVendors.sort((a, b) => {
        if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
      
      res.status(200).json({
        vendors: filteredVendors,
        total: filteredVendors.length,
        filters: query
      });
      
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  }