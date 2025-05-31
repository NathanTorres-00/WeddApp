// api/search.js
const vendors = [
    {
      id: 1,
      name: "Elegant Events Photography",
      category: "photographer",
      location: "Los Angeles, CA",
      description: "Professional wedding photography with a modern artistic style",
      tags: ["outdoor", "indoor", "destination", "engagement"],
      matchScore: 95
    },
    {
      id: 2,
      name: "Bloom & Blossom Florists",
      category: "florist",
      location: "Beverly Hills, CA",
      description: "Luxury floral designs for unforgettable weddings",
      tags: ["roses", "peonies", "modern", "rustic"],
      matchScore: 88
    }
  ];
  
  export default function handler(req, res) {
    const { method, query } = req;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'GET') {
      const searchQuery = query.q?.toLowerCase() || '';
      
      if (!searchQuery) {
        return res.status(400).json({ 
          error: 'Missing search query'
        });
      }
      
      const results = vendors.filter(vendor => {
        const searchableText = [
          vendor.name,
          vendor.category,
          vendor.description,
          vendor.location,
          ...vendor.tags
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchQuery);
      });
      
      res.status(200).json({
        query: searchQuery,
        results: results,
        total: results.length
      });
      
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
  }