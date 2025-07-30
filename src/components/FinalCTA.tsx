
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to take the next step?
        </h2>
        <p className="text-xl text-orange-100 mb-8">
          Join thousands of satisfied customers who found their dream home with RealEase
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/login?mode=signup')}
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg rounded-lg font-semibold transition-all hover:scale-105"
          >
            Sign Up Free
          </Button>
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg rounded-lg font-semibold transition-all hover:scale-105"
          >
            Talk to an Agent
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
