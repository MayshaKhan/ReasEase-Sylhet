import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getPopularPosts } from "@/data/blogs";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const popularPosts = getPopularPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link to="/blog">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <article>
          {/* Hero Section */}
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-4xl mx-auto">
                <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-orange-500 text-white">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center text-white/90 text-sm">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-6">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-6">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <div className="prose prose-lg max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="text-gray-700 leading-relaxed"
                    />
                  </div>
                  
                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Found this helpful?
                        </h3>
                        <p className="text-gray-600">Share this article with others</p>
                      </div>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Article
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Author Bio */}
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{post.author}</h3>
                      <p className="text-gray-600">Real Estate Expert</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Helping clients navigate the property market with expert insights and personalized guidance.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-24 space-y-8">
                  {/* Popular Posts */}
                  <Card className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Popular Posts</h3>
                    <div className="space-y-4">
                      {popularPosts.filter(p => p.id !== post.id).slice(0, 4).map((popularPost) => (
                        <Link key={popularPost.id} to={`/blog/${popularPost.slug}`} className="block group">
                          <div className="flex gap-3">
                            <img
                              src={popularPost.image}
                              alt={popularPost.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-900 group-hover:text-orange-500 line-clamp-2 mb-1">
                                {popularPost.title}
                              </h4>
                              <p className="text-xs text-gray-500">{popularPost.readTime}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>

                  {/* CTA */}
                  <Card className="p-6 bg-orange-50 border-orange-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
                      Need expert advice?
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Get personalized guidance from our real estate professionals.
                    </p>
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
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;