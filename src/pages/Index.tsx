
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedListings from "@/components/FeaturedListings";
import PopularNeighborhoods from "@/components/PopularNeighborhoods";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <FeaturedListings />
      <WhyChooseUs />
      <PopularNeighborhoods />
      <Testimonials />
      <BlogPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
