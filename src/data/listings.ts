export interface Listing {
  id: number;
  title: string;
  location: string;
  city: string;
  price: number;
  priceDisplay: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  type: "Buy" | "Rent";
  propertyType: "apartment" | "house" | "villa" | "commercial" | "studio";
  amenities: string[];
  nearbySchools: boolean;
}

export const allListings: Listing[] = [
  {
    id: 1,
    title: "Family Villa for Sale",
    location: "Dhaka, Gulshan",
    city: "dhaka",
    price: 150000,
    priceDisplay: "$150,000",
    beds: 4,
    baths: 3,
    sqft: "2,500",
    image: "/image-uploads/d191584e-0741-4edb-8fda-3ad629483420.png",
    type: "Buy",
    propertyType: "villa",
    amenities: ["parking", "garden"],
    nearbySchools: true,
  },
  {
    id: 2,
    title: "Modern Duplex House",
    location: "Sylhet, Zindabazar",
    city: "sylhet",
    price: 125000,
    priceDisplay: "$125,000",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    type: "Buy",
    propertyType: "house",
    amenities: ["parking", "garden", "security"],
    nearbySchools: true,
  },
  {
    id: 3,
    title: "Luxury Apartment",
    location: "Sylhet, Amberkhana",
    city: "sylhet",
    price: 850,
    priceDisplay: "$850/month",
    beds: 3,
    baths: 2,
    sqft: "1,800",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    type: "Rent",
    propertyType: "apartment",
    amenities: ["gym", "pool", "parking"],
    nearbySchools: false,
  },
  {
    id: 3,
    title: "Family Villa",
    location: "Sylhet, Shahjalal Upashahar",
    city: "sylhet",
    price: 180000,
    priceDisplay: "$180,000",
    beds: 5,
    baths: 4,
    sqft: "3,200",
    image:
      "https://plus.unsplash.com/premium_photo-1661751356300-c4756372be3b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Buy",
    propertyType: "villa",
    amenities: ["garden", "pool", "security", "parking"],
    nearbySchools: true,
  },
  {
    id: 4,
    title: "Cozy Studio",
    location: "Sylhet, Bondor Bazar",
    city: "sylhet",
    price: 450,
    priceDisplay: "$450/month",
    beds: 1,
    baths: 1,
    sqft: "650",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    type: "Rent",
    propertyType: "studio",
    amenities: ["wifi", "furnished"],
    nearbySchools: false,
  },
  {
    id: 5,
    title: "Premium Apartment",
    location: "Dhaka, Gulshan",
    city: "dhaka",
    price: 95000,
    priceDisplay: "$95,000",
    beds: 3,
    baths: 2,
    sqft: "1,500",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    type: "Buy",
    propertyType: "apartment",
    amenities: ["gym", "security", "parking"],
    nearbySchools: true,
  },
  {
    id: 6,
    title: "Commercial Space",
    location: "Chattogram, Agrabad",
    city: "chattogram",
    price: 250000,
    priceDisplay: "$250,000",
    beds: 0,
    baths: 2,
    sqft: "4,000",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop",
    type: "Buy",
    propertyType: "commercial",
    amenities: ["parking", "security", "elevator"],
    nearbySchools: false,
  },
  {
    id: 7,
    title: "Student Housing",
    location: "Chattogram, University Area",
    city: "chattogram",
    price: 300,
    priceDisplay: "$300/month",
    beds: 2,
    baths: 1,
    sqft: "900",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    type: "Rent",
    propertyType: "apartment",
    amenities: ["wifi", "furnished", "library"],
    nearbySchools: true,
  },
  {
    id: 8,
    title: "Short-term Apartment",
    location: "Dhaka, Dhanmondi",
    city: "dhaka",
    price: 1200,
    priceDisplay: "$1,200/month",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    type: "Rent",
    propertyType: "apartment",
    amenities: ["wifi", "furnished", "gym"],
    nearbySchools: false,
  },
  {
    id: 9,
    title: "Beachfront Villa",
    location: "Cox's Bazar, Sea Beach",
    city: "coxsbazar",
    price: 320000,
    priceDisplay: "$320,000",
    beds: 6,
    baths: 5,
    sqft: "4,500",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    type: "Buy",
    propertyType: "villa",
    amenities: ["beachfront", "pool", "garden", "parking"],
    nearbySchools: false,
  },
  {
    id: 10,
    title: "Budget Apartment",
    location: "Dhaka, Mirpur",
    city: "dhaka",
    price: 400,
    priceDisplay: "$400/month",
    beds: 2,
    baths: 1,
    sqft: "800",
    image:
      "https://images.unsplash.com/photo-1529408632839-a54952c491e5?w=800&h=600&fit=crop",
    type: "Rent",
    propertyType: "apartment",
    amenities: ["parking"],
    nearbySchools: true,
  },
];

export const getBuyListings = () =>
  allListings.filter((listing) => listing.type === "Buy");
export const getRentListings = () =>
  allListings.filter((listing) => listing.type === "Rent");

export const filterListings = (
  listings: Listing[],
  filters: {
    city?: string;
    budget?: string;
    propertyType?: string;
    bedrooms?: string;
    amenities?: string;
    nearbySchools?: boolean;
  }
) => {
  return listings.filter((listing) => {
    // City filter
    if (filters.city && listing.city !== filters.city) {
      return false;
    }

    // Budget filter
    if (filters.budget) {
      if (listing.type === "Buy") {
        switch (filters.budget) {
          case "0-100k":
            if (listing.price > 100000) return false;
            break;
          case "100k-200k":
            if (listing.price < 100000 || listing.price > 200000) return false;
            break;
          case "200k+":
            if (listing.price < 200000) return false;
            break;
        }
      } else {
        switch (filters.budget) {
          case "0-500":
            if (listing.price > 500) return false;
            break;
          case "500-1000":
            if (listing.price < 500 || listing.price > 1000) return false;
            break;
          case "1000+":
            if (listing.price < 1000) return false;
            break;
        }
      }
    }

    // Property type filter
    if (filters.propertyType && listing.propertyType !== filters.propertyType) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      const minBeds = parseInt(filters.bedrooms);
      if (listing.beds < minBeds) return false;
    }

    // Amenities filter
    if (filters.amenities) {
      if (!listing.amenities.includes(filters.amenities)) return false;
    }

    // Nearby schools filter
    if (filters.nearbySchools && !listing.nearbySchools) {
      return false;
    }

    return true;
  });
};
