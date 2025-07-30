import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import { supabase } from "@/integrations/supabase/client";

type Listing = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: string;
  propertyType: string;
  amenities: string[];
  nearbySchools: boolean;
  priceDisplay: string;
};

const Buy = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("price");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .eq('listing_type', 'Buy');

        if (error) throw error;

        const formattedListings = data?.map(property => ({
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          beds: property.bedrooms,
          baths: property.bathrooms,
          sqft: property.square_feet,
          image: property.images?.[0] || '/placeholder.svg',
          type: property.listing_type,
          propertyType: property.property_type,
          amenities: property.amenities || [],
          nearbySchools: property.nearby_schools,
          priceDisplay: `$${property.price?.toLocaleString()}`
        })) || [];

        setListings(formattedListings);
      } catch (error) {
        console.error('Error fetching buy properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyProperties();
  }, []);

  const handleFiltersChange = (filters: any) => {
    // For now, basic client-side filtering
    console.log('Filters changed:', filters);
  };

  // Re-sort when sort option changes
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const sorted = [...listings].sort((a, b) => {
      switch (newSort) {
        case "price":
          return a.price - b.price;
        case "date":
          return b.id.localeCompare(a.id);
        case "popularity":
          return b.beds - a.beds;
        default:
          return 0;
      }
    });
    setListings(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏠 Properties for Sale in Dhaka, Chattogram, Sylhet & Beyond
            </h1>
            <p className="text-lg text-gray-600">
              Find your dream home with our extensive collection of properties for sale
            </p>
          </div>
        </div>

        {/* Search Filters */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SearchFilters onFiltersChange={handleFiltersChange} type="Buy" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {listings.length} properties
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="date">Date Listed</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Listings Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500 text-white">
                      For Sale
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    {listing.beds > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{listing.beds}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{listing.baths}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{listing.sqft} sq ft</span>
                    </div>
                  </div>
                  
                  <div className="font-bold text-xl text-orange-500 mb-3">
                    {listing.priceDisplay}
                  </div>

                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => navigate(`/listing/${listing.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Buy;