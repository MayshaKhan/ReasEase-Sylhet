-- Insert mock blog data
INSERT INTO public.blogs (user_id, title, slug, excerpt, content, category, author, read_time, featured_image, is_featured, status) VALUES
(
  (SELECT user_id FROM public.profiles LIMIT 1),
  '5 Tips for First-Time Home Buyers in Sylhet',
  '5-tips-for-first-time-home-buyers-in-sylhet',
  'Navigate the Sylhet real estate market with confidence using these expert tips and insights.',
  '<h2>Introduction</h2><p>Buying your first home in Sylhet can be an exciting yet overwhelming experience. With the right guidance and preparation, you can navigate the market successfully and find your dream property.</p><h2>1. Research the Market</h2><p>Understanding local market trends, price ranges, and neighborhood characteristics is crucial for making an informed decision.</p><h2>2. Get Pre-approved for a Mortgage</h2><p>Having a pre-approval letter shows sellers you are serious and can act quickly when you find the right property.</p><h2>3. Choose the Right Location</h2><p>Consider factors like proximity to work, schools, hospitals, and transportation when selecting a neighborhood.</p><h2>4. Inspect Thoroughly</h2><p>Never skip a professional home inspection. It can save you thousands in potential repair costs.</p><h2>5. Work with Local Experts</h2><p>Partner with experienced real estate agents who know the Sylhet market inside and out.</p>',
  'Buying Guide',
  'Sarah Johnson',
  '5 min read',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=300&fit=crop',
  true,
  'published'
),
(
  (SELECT user_id FROM public.profiles LIMIT 1),
  'Investment Opportunities in Sylhets Growing Market',
  'investment-opportunities-in-sylhets-growing-market',
  'Discover the best investment opportunities in Sylhets rapidly expanding real estate sector.',
  '<h2>Market Overview</h2><p>Sylhet real estate market has shown remarkable growth over the past few years, making it an attractive destination for property investors.</p><h2>Prime Investment Areas</h2><p>Areas like Zindabazar, Amberkhana, and Upashahar offer excellent investment potential with high rental yields and capital appreciation prospects.</p><h2>Commercial vs Residential</h2><p>Both sectors offer unique advantages. Commercial properties provide higher rental yields, while residential properties offer better long-term capital appreciation.</p><h2>Future Outlook</h2><p>With ongoing infrastructure development and increasing demand, the market is positioned for continued growth.</p>',
  'Investment',
  'Ahmad Hassan',
  '7 min read',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&h=300&fit=crop',
  false,
  'published'
),
(
  (SELECT user_id FROM public.profiles LIMIT 1),
  'Rental Market Trends: What Tenants Want in 2024',
  'rental-market-trends-what-tenants-want-in-2024',
  'Stay ahead of rental market trends and understand what modern tenants are looking for.',
  '<h2>Changing Tenant Preferences</h2><p>Modern tenants prioritize flexibility, amenities, and technology integration when choosing rental properties.</p><h2>Top Amenities in Demand</h2><ul><li>High-speed internet connectivity</li><li>Modern kitchen appliances</li><li>Air conditioning</li><li>Parking facilities</li><li>Security systems</li></ul><h2>Location Factors</h2><p>Proximity to public transportation, shopping centers, and educational institutions remains crucial for tenant satisfaction.</p><h2>Technology Integration</h2><p>Smart home features and digital payment options are becoming increasingly important to tech-savvy tenants.</p>',
  'Rental',
  'Maria Rodriguez',
  '6 min read',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=300&fit=crop',
  false,
  'published'
);