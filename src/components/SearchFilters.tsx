import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, DollarSign, Home, Bed, Zap, GraduationCap } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    city?: string;
    budget?: string;
    propertyType?: string;
    bedrooms?: string;
    amenities?: string;
    nearbySchools?: boolean;
  }) => void;
  type?: "Buy" | "Rent";
}

const SearchFilters = ({ onFiltersChange, type }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    city: "",
    budget: "",
    propertyType: "",
    bedrooms: "",
    amenities: "",
    nearbySchools: false
  });

  const updateFilter = (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Clean up empty filters before passing to parent
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== "" && v !== false)
    );
    onFiltersChange(cleanFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      city: "",
      budget: "",
      propertyType: "",
      bedrooms: "",
      amenities: "",
      nearbySchools: false
    };
    setFilters(emptyFilters);
    onFiltersChange({});
  };

  const budgetOptions = type === "Buy" 
    ? [
        { value: "0-100k", label: "$0 - $100k" },
        { value: "100k-200k", label: "$100k - $200k" },
        { value: "200k+", label: "$200k+" }
      ]
    : [
        { value: "0-500", label: "$0 - $500/month" },
        { value: "500-1000", label: "$500 - $1000/month" },
        { value: "1000+", label: "$1000+/month" }
      ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-5 w-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900">Search Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* City Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            City
          </label>
          <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="sylhet">Sylhet</SelectItem>
              <SelectItem value="chattogram">Chattogram</SelectItem>
              <SelectItem value="coxsbazar">Cox's Bazar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Budget
          </label>
          <Select value={filters.budget} onValueChange={(value) => updateFilter("budget", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Home className="h-4 w-4" />
            Property Type
          </label>
          <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <SelectValue placeholder="Property type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Bed className="h-4 w-4" />
            Bedrooms
          </label>
          <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <SelectValue placeholder="Min bedrooms" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="1">1+ Bed</SelectItem>
              <SelectItem value="2">2+ Beds</SelectItem>
              <SelectItem value="3">3+ Beds</SelectItem>
              <SelectItem value="4">4+ Beds</SelectItem>
              <SelectItem value="5">5+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Zap className="h-4 w-4" />
            Amenities
          </label>
          <Select value={filters.amenities} onValueChange={(value) => updateFilter("amenities", value)}>
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <SelectValue placeholder="Select amenity" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="parking">Parking</SelectItem>
              <SelectItem value="gym">Gym</SelectItem>
              <SelectItem value="pool">Pool</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="garden">Garden</SelectItem>
              <SelectItem value="wifi">WiFi</SelectItem>
              <SelectItem value="furnished">Furnished</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nearby Schools Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Nearby Schools
          </label>
          <Select 
            value={filters.nearbySchools ? "yes" : ""} 
            onValueChange={(value) => updateFilter("nearbySchools", value === "yes")}
          >
            <SelectTrigger className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button 
          onClick={clearFilters}
          variant="outline"
          className="flex-1"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;