import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, getPopularPosts, type BlogPost } from "@/data/blogs";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Buying", "Renting", "Investing", "Legal", "Tips"];
  const popularPosts = getPopularPosts();

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Insights. Advice. Inspiration.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Smart decisions start with the right knowledge.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Featured Posts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 gap-8">
                  {blogPosts.filter(post => post.featured && (selectedCategory === "All" || post.category === selectedCategory)).slice(0, 1).map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500 text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <User className="h-4 w-4 mr-1" />
                          <span className="mr-4">{post.author}</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            📖 Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Posts */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.filter(post => !post.featured).map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-orange-500 text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <span className="mr-3">{post.author}</span>
                          <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            📖 Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Search */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                    <Search className="h-5 w-5 mr-2 text-orange-500" />
                    Search
                  </h3>
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </Card>

                {/* Categories */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? "bg-orange-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Popular Posts */}
                <Card className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    {popularPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                        <div className="flex gap-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-gray-900 group-hover:text-orange-500 line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500">{post.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* CTA */}
                <Card className="p-6 bg-orange-50 border-orange-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                    Have questions? We're here to help.
                  </h3>
                  <Link to="/contact">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      📩 Contact an Agent
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;