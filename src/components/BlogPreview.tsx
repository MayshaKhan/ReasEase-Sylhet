
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BlogPreview = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching blogs:', error);
          return;
        }

        // Format data for display
        const formattedPosts = data?.map(blog => ({
          title: blog.title,
          excerpt: blog.excerpt,
          image: blog.featured_image,
          author: blog.author,
          date: new Date(blog.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          category: blog.category,
          slug: blog.slug
        })) || [];

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading latest blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <span>5 min read</span>
                  </div>
                </div>
                
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 hover:text-orange-500 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt && post.excerpt.length > 250 ? `${post.excerpt.substring(0, 250)}...` : post.excerpt}
                </p>
                
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
                    Read More
                  </Button>
                </Link>
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
        </>
        )}

      </div>
    </section>
  );
};

export default BlogPreview;
