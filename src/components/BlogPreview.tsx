
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

const BlogPreview = () => {
  const posts = [
    {
      title: "5 Tips for First-Time Home Buyers in Sylhet",
      excerpt: "Navigate the Sylhet real estate market with confidence using these expert tips and insights.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=300&fit=crop",
      author: "Sarah Johnson",
      date: "Dec 15, 2024",
      category: "Buying Guide"
    },
    {
      title: "Investment Opportunities in Sylhet's Growing Market",
      excerpt: "Discover the best investment opportunities in Sylhet's rapidly expanding real estate sector.",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&h=300&fit=crop",
      author: "Ahmad Hassan",
      date: "Dec 12, 2024",
      category: "Investment"
    },
    {
      title: "Rental Market Trends: What Tenants Want in 2024",
      excerpt: "Stay ahead of rental market trends and understand what modern tenants are looking for.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=300&fit=crop",
      author: "Maria Rodriguez",
      date: "Dec 10, 2024",
      category: "Rental"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600">
            Stay informed with the latest real estate insights and market trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium mr-3">
                    {post.category}
                  </span>
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl text-gray-900 mb-3 hover:text-orange-500 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-lg">
              📚 Visit Blog
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
