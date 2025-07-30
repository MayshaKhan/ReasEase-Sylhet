
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Shield, Calendar } from "lucide-react";

const About = () => {
  const milestones = [
    { year: "2019", achievement: "Founded RealEase in Sylhet" },
    { year: "2020", achievement: "Reached 100+ property listings" },
    { year: "2022", achievement: "Served 500+ happy families" },
    { year: "2024", achievement: "Expanded to 1000+ properties" }
  ];

  const team = [
    {
      name: "Ahmed Rahman",
      role: "Founder & CEO",
      bio: "With 10+ years in real estate, Ahmed founded RealEase to simplify property transactions in Sylhet."
    },
    {
      name: "Fatima Khan",
      role: "Head of Operations",
      bio: "Fatima ensures smooth operations and customer satisfaction with her 8 years of experience."
    },
    {
      name: "Mohammad Ali",
      role: "Senior Property Consultant",
      bio: "Mohammad specializes in residential properties and has helped 200+ families find their dream homes."
    }
  ];

  const trustFactors = [
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Licensed & Certified",
      description: "Fully licensed real estate company with proper certifications"
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Verified Partners",
      description: "All our property partners are verified and trusted"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Expert Team",
      description: "Professional team with years of local market experience"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
            <p className="mb-6">
              RealEase was founded in 2019 with a simple mission: to make property transactions 
              in Sylhet transparent, trustworthy, and effortless. We recognized that finding the 
              perfect home or investment property shouldn't be a stressful experience.
            </p>
            <p className="mb-6">
              Our vision is to become Sylhet's most trusted real estate platform, where every 
              property seeker finds their dream home and every property owner gets the best value 
              for their investment.
            </p>
            <p>
              Behind RealEase is a passionate team of local experts who understand the Sylhet 
              market inside and out. We combine traditional real estate knowledge with modern 
              technology to serve our community better.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Key milestones that shaped our growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-orange-500 mb-2">
                    {milestone.year}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.achievement}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The people behind RealEase
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Trust Us
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to excellence and transparency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFactors.map((factor, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {factor.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {factor.title}
                  </h3>
                  <p className="text-gray-600">
                    {factor.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Let's help you find your perfect property or grow your real estate portfolio
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg rounded-lg font-semibold">
              Contact Us
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg rounded-lg font-semibold">
              Work with Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
