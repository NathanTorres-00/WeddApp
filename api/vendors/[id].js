// api/vendors/[id].js
const vendors = [
    {
      id: 1,
      name: "Elegant Events Photography",
      category: "photographer",
      location: "Los Angeles, CA",
      priceRange: "$2000-$4000",
      rating: 4.8,
      description: "Professional wedding photography with a modern artistic style",
      longDescription: "With over 10 years of experience, Elegant Events Photography specializes in capturing the authentic emotions and beautiful moments of your special day.",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
      ],
      contactInfo: {
        email: "info@elegantevents.com",
        phone: "(555) 123-4567",
        website: "https://elegantevents.com"
      },
      services: [
        "Wedding Day Photography (8 hours)",
        "Engagement Session",
        "Online Gallery with High-Res Downloads"
      ],
      packages: [
        {
          name: "Essential",
          price: "$2000",
          hours: 6,
          images: 300
        },
        {
          name: "Premium",
          price: "$3000",
          hours: 8,
          images: 500
        }
      ],
      reviews: [
        {
          id: 1,
          author: "Sarah M.",
          rating: 5,
          date: "2024-10-15",
          text: "Absolutely amazing! They captured every moment perfectly."
        }
      ],
      tags: ["outdoor", "indoor", "destination", "engagement"],
      availability: ["2025-06-01", "2025-07-15", "2025-08-20"],
      matchScore: 95
    }
  ];
  
  export default function handler(req, res) {
    const { method, query } = req;
    const { id } = query;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'GET') {
      const vendor = vendors.find(v => v.id === parseInt(id));
      
      if (!vendor) {
        return res.status(404).json({ 
          error: 'Vendor not found',
          message: `No vendor found with ID: ${id}`
        });
      }
      
      res.status(200).json({ vendor });
      
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  }