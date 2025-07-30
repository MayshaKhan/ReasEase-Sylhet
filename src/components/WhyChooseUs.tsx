
import { CheckCircle, MapPin, Shield } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Verified Listings Only",
      description: "Every property is thoroughly verified and checked for authenticity before listing."
    },
    {
      icon: MapPin,
      title: "Local Market Experts",
      description: "Our team knows Sylhet inside out, providing you with the best local insights."
    },
    {
      icon: Shield,
      title: "Safe, Secure Transactions",
      description: "Complete transaction security with legal documentation and trusted processes."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Thousands Trust <span className="text-orange-500">RealEase</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
