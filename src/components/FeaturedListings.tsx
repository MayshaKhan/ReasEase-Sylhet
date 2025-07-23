
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { allListings } from "@/data/listings";

const FeaturedListings = () => {
  const navigate = useNavigate();
  // Show first 4 listings as featured
  const listings = allListings.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Listings
          </h2>
          <p className="text-xl text-gray-600">
            Discover our handpicked selection of premium properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {listings.map((listing) => (
            <Card 
              key={listing.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/listing/${listing.id}`)}
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    listing.type === 'Buy' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {listing.type}
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
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{listing.beds}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{listing.baths}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{listing.sqft} sq ft</span>
                  </div>
                </div>
                
                  <div className="font-bold text-xl text-orange-500">
                    {listing.priceDisplay}
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/buy')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-lg"
          >
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
