import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  PenTool, 
  Heart, 
  LogOut, 
  Upload,
  Bed,
  Bath,
  Square,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Clock
} from "lucide-react";
import { allListings } from "@/data/listings";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list-property");
  const navigate = useNavigate();

  const favoriteListings = allListings.slice(0, 6); // Mock favorites

  const sidebarItems = [
    { id: "list-property", label: "List Property", icon: Home },
    { id: "create-blog", label: "Create Blog", icon: PenTool },
    { id: "favorites", label: "Favorite Properties", icon: Heart },
  ];

  const amenitiesOptions = [
    "parking", "garden", "gym", "pool", "security", "wifi", "furnished", 
    "elevator", "library", "beachfront"
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        </div>
        
        <nav className="mt-6 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id ? "bg-orange-50 border-r-2 border-orange-500 text-orange-600" : "text-gray-700"
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center px-3 py-2 mb-2 text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Home className="w-5 h-5 mr-3" />
            Back to Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 ml-64 h-screen overflow-y-auto">
        <div className="p-8">
        {activeTab === "list-property" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">List New Property</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" placeholder="e.g., Modern 3-Bedroom Flat in Banani" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Dhaka, Gulshan" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                        <SelectItem value="chattogram">Chattogram</SelectItem>
                        <SelectItem value="coxsbazar">Cox's Bazar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Property Specifications */}
                <Separator />
                <h3 className="text-lg font-semibold">Property Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input id="beds" type="number" placeholder="0" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input id="baths" type="number" placeholder="0" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input id="sqft" placeholder="e.g., 2,500" />
                  </div>
                </div>

                {/* Pricing */}
                <Separator />
                <h3 className="text-lg font-semibold">Pricing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Listing Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buy">For Sale</SelectItem>
                        <SelectItem value="Rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="Enter price" />
                  </div>
                </div>

                {/* Amenities */}
                <Separator />
                <h3 className="text-lg font-semibold">Amenities</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {amenitiesOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <Label htmlFor={amenity} className="text-sm capitalize">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Additional Features */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="nearbySchools" />
                  <Label htmlFor="nearbySchools">Nearby Schools</Label>
                </div>

                {/* Image Upload */}
                <Separator />
                <h3 className="text-lg font-semibold">Property Images</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload property images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  List Property
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "create-blog" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog Post</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Blog Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blogTitle">Blog Title</Label>
                  <Input id="blogTitle" placeholder="Enter blog title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input id="slug" placeholder="blog-url-slug" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buying">Buying</SelectItem>
                        <SelectItem value="Renting">Renting</SelectItem>
                        <SelectItem value="Investing">Investing</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Tips">Tips</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" placeholder="Author name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input id="readTime" placeholder="e.g., 5 min read" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" placeholder="Brief description of the blog post" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Write your blog content here (HTML supported)" 
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload featured image</p>
                    <Button variant="outline">Choose Image</Button>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Publish Blog Post
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "favorites" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Favorite Properties</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3">
                      <Heart className="w-6 h-6 text-red-500 fill-current" />
                    </div>
                    <Badge 
                      className="absolute top-3 left-3 bg-orange-600 hover:bg-orange-700"
                    >
                      {listing.type}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-orange-600">
                        {listing.priceDisplay}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {listing.beds} beds
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {listing.baths} baths
                      </span>
                      <span className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;