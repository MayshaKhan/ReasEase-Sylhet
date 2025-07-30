import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar,
  Phone,
  MessageSquare,
  MessageCircle,
  Heart,
  Share2,
  Star,
  Wifi,
  Car,
  Shield,
  Dumbbell,
  Waves,
  TreePine,
  GraduationCap,
  ShoppingCart,
  Bus
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  images: string[];
  listing_type: string;
  property_type: string;
  amenities: string[];
  nearby_schools: boolean;
  description?: string;
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [listing, setListing] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .eq('status', 'active')
          .single();

        if (error) throw error;
        setListing(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Use images from database or fallback to placeholder
  const galleryImages = listing.images && listing.images.length > 0 
    ? listing.images 
    : [
        "/placeholder.svg",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
      ];

  const priceDisplay = listing.listing_type === 'Buy' 
    ? `$${listing.price?.toLocaleString()}` 
    : `$${listing.price?.toLocaleString()}/month`;

  const amenityIcons = {
    parking: Car,
    garden: TreePine,
    security: Shield,
    gym: Dumbbell,
    pool: Waves,
    wifi: Wifi,
    furnished: Badge,
    library: GraduationCap,
    beachfront: Waves,
    elevator: ArrowLeft,
  };

  const handleScheduleVisit = () => {
    toast({
      title: "Visit Scheduled",
      description: "Our agent will contact you soon to confirm the appointment.",
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Added to saved",
      description: isSaved ? "Property removed from your favorites" : "Property saved to your favorites",
    });
  };

  const handleContact = (method: string) => {
    toast({
      title: `Contacting Agent`,
      description: `Opening ${method} to contact the agent`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{listing.location}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {priceDisplay}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleContact("share")}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button 
                variant={isSaved ? "default" : "outline"} 
                size="sm"
                onClick={handleSave}
              >
                <Heart className={`h-4 w-4 mr-1 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <img 
                src={galleryImages[currentImageIndex]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`View ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-colors ${
                    currentImageIndex === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Agent Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Licensed Agent</p>
                  <p className="text-sm text-muted-foreground">License #123456</p>
                  <div className="flex justify-center items-center mt-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">(47 reviews)</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => handleContact("call")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact("message")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Agent
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact("chat")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Property Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Property Overview</h2>
                
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <Bed className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{listing.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{listing.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{listing.square_feet}</div>
                    <div className="text-sm text-muted-foreground">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">2020</div>
                    <div className="text-sm text-muted-foreground">Year Built</div>
                  </div>
                </div>

                <Separator className="my-6" />

                 <div>
                  <h3 className="font-semibold mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {(listing.amenities || []).map((amenity) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Badge;
                      return (
                        <div key={amenity} className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <span className="capitalize">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                 <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {listing.description || `This beautiful ${listing.property_type} offers modern living in a prime location. 
                    With ${listing.bedrooms} spacious bedrooms and ${listing.bathrooms} well-appointed bathrooms, 
                    this property is perfect for families or individuals seeking comfort and convenience. 
                    The ${listing.square_feet} square feet of living space is thoughtfully designed with modern 
                    finishes and quality materials throughout.`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Location & Map</h2>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map View</p>
                    <p className="text-sm">{listing.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Nearby Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-semibold">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Schools
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>Green Valley School - 0.5 km</div>
                      <div>City High School - 1.2 km</div>
                      <div>University Campus - 2.0 km</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-semibold">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      Shopping
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>City Mall - 0.8 km</div>
                      <div>Local Market - 0.3 km</div>
                      <div>Shopping Center - 1.5 km</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-semibold">
                      <Bus className="h-5 w-5 text-primary" />
                      Transport
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>Bus Stop - 0.2 km</div>
                      <div>Metro Station - 1.0 km</div>
                      <div>Airport - 15 km</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {/* Additional property info could go here */}
          </div>
        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg lg:hidden">
        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={handleScheduleVisit}
          >
            🗓️ Schedule a Visit
          </Button>
          <Button 
            variant={isSaved ? "default" : "outline"}
            onClick={handleSave}
          >
            ❤️ {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {/* Desktop CTA Section */}
      <div className="hidden lg:block bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={handleScheduleVisit}>
              🗓️ Schedule a Visit
            </Button>
            <Button 
              variant={isSaved ? "default" : "outline"} 
              size="lg"
              onClick={handleSave}
            >
              ❤️ {isSaved ? "Saved" : "Save Listing"}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingDetails;