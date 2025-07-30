import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "@/components/UserAvatar";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list-property");
  const [loading, setLoading] = useState(false);
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogSlug, setBlogSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");

  // Function to slugify title
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setBlogSlug(slugify(title));
  };
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

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

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const uploadImages = async (files: File[], bucket: string, userId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);
      
      if (error) {
        console.error('Upload error:', error);
        throw error;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
      
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required images
    if (propertyImages.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one property image.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const amenitiesArray = amenitiesOptions.filter(amenity => 
      formData.get(amenity) === 'on'
    );

    try {
      let imageUrls: string[] = [];
      
      // Upload images
      if (user?.id) {
        imageUrls = await uploadImages(propertyImages, 'property-images', user.id);
      }

      const { error } = await supabase
        .from('properties')
        .insert([
          {
            user_id: user?.id,
            title: formData.get('title') as string,
            location: formData.get('location') as string,
            city: formData.get('city') as string,
            property_type: formData.get('propertyType') as string,
            bedrooms: parseInt(formData.get('beds') as string) || 0,
            bathrooms: parseInt(formData.get('baths') as string) || 0,
            square_feet: parseInt(formData.get('sqft') as string) || null,
            listing_type: formData.get('type') as string,
            price: parseFloat(formData.get('price') as string),
            amenities: amenitiesArray,
            nearby_schools: formData.get('nearbySchools') === 'on',
            images: imageUrls,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Property Listed!",
        description: "Your property has been successfully listed.",
      });

      // Reset form and images
      (e.target as HTMLFormElement).reset();
      setPropertyImages([]);
    } catch (error) {
      console.error('Error listing property:', error);
      toast({
        title: "Error",
        description: "Failed to list property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required featured image
    if (!blogImage) {
      toast({
        title: "Featured Image Required",
        description: "Please upload a featured image for your blog post.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate required content
    if (!blogContent.trim()) {
      toast({
        title: "Content Required",
        description: "Please write some content for your blog post.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      let featuredImageUrl: string | null = null;
      
      // Upload featured image
      if (user?.id) {
        const imageUrls = await uploadImages([blogImage], 'blog-images', user.id);
        featuredImageUrl = imageUrls[0];
      }

      const { error } = await supabase
        .from('blogs')
        .insert([
          {
            user_id: user?.id,
            title: formData.get('blogTitle') as string,
            slug: formData.get('slug') as string,
            excerpt: formData.get('excerpt') as string,
            content: blogContent,
            category: formData.get('category') as string,
            author: profile?.full_name || 'User',
            read_time: formData.get('readTime') as string,
            is_featured: formData.get('featured') === 'on',
            featured_image: featuredImageUrl,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Blog Published!",
        description: "Your blog post has been successfully published.",
      });

      // Reset form and image
      (e.target as HTMLFormElement).reset();
      setBlogImage(null);
      setBlogSlug("");
      setBlogContent("");
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast({
        title: "Error",
        description: "Failed to publish blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <UserAvatar 
              avatarUrl={profile?.avatar_url} 
              fullName={profile?.full_name}
              size="md"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {profile?.full_name || "User"}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {profile?.user_type || "User"}
              </p>
            </div>
          </div>
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
              <CardContent>
                <form onSubmit={handlePropertySubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input id="title" name="title" placeholder="e.g., Modern 3-Bedroom Flat in Banani" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input id="location" name="location" placeholder="e.g., Dhaka, Gulshan" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select name="city" required>
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
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select name="propertyType" required>
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
                    <Label htmlFor="beds">Bedrooms *</Label>
                    <Input id="beds" name="beds" type="number" min="0" placeholder="0" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="baths">Bathrooms *</Label>
                    <Input id="baths" name="baths" type="number" min="0" placeholder="0" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input id="sqft" name="sqft" type="number" min="0" placeholder="e.g., 2500" />
                  </div>
                </div>

                {/* Pricing */}
                <Separator />
                <h3 className="text-lg font-semibold">Pricing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Listing Type *</Label>
                    <Select name="type" required>
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
                    <Label htmlFor="price">Price *</Label>
                    <Input id="price" name="price" type="number" min="0" step="0.01" placeholder="Enter price" required />
                  </div>
                </div>

                {/* Amenities */}
                <Separator />
                <h3 className="text-lg font-semibold">Amenities</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                   {amenitiesOptions.map((amenity) => (
                     <div key={amenity} className="flex items-center space-x-2">
                       <Checkbox id={amenity} name={amenity} />
                       <Label htmlFor={amenity} className="text-sm capitalize">
                         {amenity}
                       </Label>
                     </div>
                   ))}
                </div>

                {/* Additional Features */}
                 <div className="flex items-center space-x-2">
                   <Checkbox id="nearbySchools" name="nearbySchools" />
                   <Label htmlFor="nearbySchools">Nearby Schools</Label>
                 </div>

                {/* Image Upload */}
                <Separator />
                <h3 className="text-lg font-semibold">Property Images *</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload property images (Required)</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setPropertyImages(files);
                    }}
                    style={{ display: 'none' }}
                    id="property-images"
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    className="mt-4"
                    onClick={() => document.getElementById('property-images')?.click()}
                  >
                    Choose Files
                  </Button>
                  {propertyImages.length > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      {propertyImages.length} image(s) selected
                    </p>
                  )}
                </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={loading}
                  >
                    {loading ? "Listing Property..." : "List Property"}
                  </Button>
                </form>
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
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="space-y-2">
                  <Label htmlFor="blogTitle">Blog Title *</Label>
                  <Input 
                    id="blogTitle" 
                    name="blogTitle" 
                    placeholder="Enter blog title" 
                    onChange={handleTitleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input 
                    id="slug" 
                    name="slug" 
                    placeholder="blog-url-slug" 
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select name="category" required>
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
                    <Label htmlFor="readTime">Read Time *</Label>
                    <Input id="readTime" name="readTime" placeholder="e.g., 5 min read" required />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" name="featured" />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea id="excerpt" name="excerpt" placeholder="Brief description of the blog post" required />
                </div>

                <div className="space-y-2">
                  <Label>Content *</Label>
                  <div className="min-h-[400px]">
                    <ReactQuill
                      theme="snow"
                      value={blogContent}
                      onChange={setBlogContent}
                      placeholder="Write your blog content here..."
                      className="h-[350px] mb-12"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'image'],
                          ['clean']
                        ],
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Featured Image *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload featured image (Required)</p>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setBlogImage(file);
                      }}
                      style={{ display: 'none' }}
                      id="blog-image"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('blog-image')?.click()}
                    >
                      Choose Image
                    </Button>
                    {blogImage && (
                      <p className="text-sm text-green-600 mt-2">
                        Image selected: {blogImage.name}
                      </p>
                    )}
                  </div>
                </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={loading}
                  >
                    {loading ? "Publishing..." : "Publish Blog Post"}
                  </Button>
                </form>
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