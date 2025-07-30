
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: ""
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.location) params.set("city", filters.location.toLowerCase());
    if (filters.propertyType) params.set("propertyType", filters.propertyType);
    if (filters.priceRange) params.set("budget", filters.priceRange);
    navigate(`/buy?${params.toString()}`);
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60">
        <img
          src="/lovable-uploads/d191584e-0741-4edb-8fda-3ad629483420.png"
          alt="Beautiful homes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-48">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Find Your Next{" "}
          <span className="text-orange-500">Home</span> —
          <br />
          Quickly, Safely, and Locally
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in">
          Whether you're buying, renting, or selling, we bring trust and simplicity to your property journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button 
            onClick={() => navigate('/buy')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-lg transition-all hover:scale-105"
          >
            Browse Listings
          </Button>
          <Button 
            onClick={() => navigate('/sell')}
            variant="outline" 
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg rounded-lg transition-all hover:scale-105"
          >
            List Your Property
          </Button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Location</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              >
                <option value="">Select Location</option>
                <option value="dhaka">Dhaka</option>
                <option value="sylhet">Sylhet</option>
                <option value="chattogram">Chattogram</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Property Type</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
              >
                <option value="">Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Price Range</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              >
                <option value="">Select Range</option>
                <option value="0-100k">$0 - $100k</option>
                <option value="100k-200k">$100k - $200k</option>
                <option value="200k+">$200k+</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg flex items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
