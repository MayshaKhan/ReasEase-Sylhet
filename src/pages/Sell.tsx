import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload, Users, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Sell = () => {
  const navigate = useNavigate();

  const handleStartListing = () => {
    navigate("/dashboard");
  };

  const steps = [
    {
      step: 1,
      title: "Sign up or Log in",
      description: "Create your account or sign in to get started",
      icon: Users
    },
    {
      step: 2,
      title: "Upload photos & details",
      description: "Add high-quality photos and property information",
      icon: Upload
    },
    {
      step: 3,
      title: "Get matched with agents (optional)",
      description: "Connect with experienced real estate professionals",
      icon: Users
    },
    {
      step: 4,
      title: "Go live in minutes",
      description: "Your property will be visible to thousands of buyers",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              List Your Property with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Reach thousands of active buyers and renters in just a few clicks.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleStartListing}
            >
              📝 Start Listing
            </Button>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                List your property in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <Card key={step.step} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                        {step.step}
                      </div>
                      <CardTitle className="text-lg text-gray-900">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Stats */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
                <p className="text-gray-600">Successful listings last year</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">17 Days</h3>
                <p className="text-gray-600">Average sale time</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
                <p className="text-gray-600">Customer satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why List With Us?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Reach</h3>
                <p className="text-gray-600">Connect with thousands of active buyers and renters</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Process</h3>
                <p className="text-gray-600">List your property in minutes, not hours</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Support</h3>
                <p className="text-gray-600">Get help from experienced real estate professionals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to List Your Property?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful property sellers on our platform
            </p>
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleStartListing}
            >
              📤 Post Your Property Now
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Sell;