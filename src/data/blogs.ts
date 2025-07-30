export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: "Buying" | "Renting" | "Investing" | "Legal" | "Tips";
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "First-Time Homebuyer's Complete Guide",
    slug: "first-time-homebuyer-guide",
    excerpt: "Everything you need to know before buying your first home, from financing to closing.",
    content: `
      <h2>Getting Started with Your First Home Purchase</h2>
      <p>Buying your first home is an exciting milestone, but it can also feel overwhelming. This comprehensive guide will walk you through every step of the process, from understanding your budget to closing on your dream home.</p>
      
      <h3>1. Assess Your Financial Readiness</h3>
      <p>Before you start house hunting, it's crucial to understand your financial situation. Calculate your debt-to-income ratio, check your credit score, and determine how much you can afford for a down payment.</p>
      
      <h3>2. Get Pre-approved for a Mortgage</h3>
      <p>Getting pre-approved gives you a clear picture of your budget and shows sellers that you're a serious buyer. Shop around with different lenders to find the best rates and terms.</p>
      
      <h3>3. Find the Right Real Estate Agent</h3>
      <p>A good agent will guide you through the process, help you find properties that meet your criteria, and negotiate on your behalf.</p>
      
      <h3>4. Start House Hunting</h3>
      <p>Make a list of your must-haves versus nice-to-haves. Consider factors like location, schools, commute time, and future resale value.</p>
      
      <h3>5. Make an Offer and Close</h3>
      <p>Once you find the right property, your agent will help you make a competitive offer. After acceptance, you'll go through inspections, appraisal, and finally closing.</p>
    `,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    category: "Buying",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "Top 10 Investment Property Strategies",
    slug: "investment-property-strategies",
    excerpt: "Discover proven strategies to build wealth through real estate investment.",
    content: `
      <h2>Building Wealth Through Real Estate Investment</h2>
      <p>Real estate investment can be a powerful way to build long-term wealth. Here are the top 10 strategies that successful investors use.</p>
      
      <h3>1. Buy and Hold Strategy</h3>
      <p>Purchase properties in growing areas and hold them for long-term appreciation while collecting rental income.</p>
      
      <h3>2. Fix and Flip</h3>
      <p>Buy properties below market value, renovate them, and sell for a profit. Requires construction knowledge and market timing.</p>
      
      <h3>3. BRRRR Method</h3>
      <p>Buy, Rehab, Rent, Refinance, Repeat. This strategy allows you to recycle your initial investment.</p>
      
      <h3>4. House Hacking</h3>
      <p>Live in a multi-unit property and rent out the other units to offset your mortgage payments.</p>
      
      <h3>5. Commercial Real Estate</h3>
      <p>Invest in office buildings, retail spaces, or warehouses for potentially higher returns.</p>
    `,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    category: "Investing",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "12 min read",
    featured: true
  },
  {
    id: 3,
    title: "Understanding Rental Market Trends",
    slug: "rental-market-trends",
    excerpt: "Key insights into current rental market conditions and what to expect.",
    content: `
      <h2>Current State of the Rental Market</h2>
      <p>The rental market has seen significant changes in recent years. Understanding these trends can help both landlords and tenants make informed decisions.</p>
      
      <h3>Rising Rental Prices</h3>
      <p>Rental prices have increased in most major cities due to high demand and limited supply.</p>
      
      <h3>Changing Tenant Preferences</h3>
      <p>Post-pandemic, tenants prioritize amenities like home offices, outdoor spaces, and flexible lease terms.</p>
      
      <h3>Technology in Property Management</h3>
      <p>Virtual tours, online applications, and digital payments are becoming standard in the rental process.</p>
    `,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    category: "Renting",
    author: "Emily Rodriguez",
    date: "2024-01-08",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 4,
    title: "Legal Considerations in Property Transactions",
    slug: "legal-considerations-property",
    excerpt: "Important legal aspects every property buyer and seller should know.",
    content: `
      <h2>Legal Fundamentals in Real Estate</h2>
      <p>Understanding the legal aspects of property transactions can save you from costly mistakes and ensure a smooth process.</p>
      
      <h3>Title Insurance</h3>
      <p>Protects against title defects that could affect your ownership rights.</p>
      
      <h3>Property Disclosures</h3>
      <p>Sellers are required to disclose known issues with the property.</p>
      
      <h3>Contract Contingencies</h3>
      <p>Important clauses that protect buyers during the transaction process.</p>
    `,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    category: "Legal",
    author: "David Wilson",
    date: "2024-01-05",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 5,
    title: "Home Staging Tips That Sell",
    slug: "home-staging-tips",
    excerpt: "Professional staging tips to make your property irresistible to buyers.",
    content: `
      <h2>The Art of Home Staging</h2>
      <p>Proper staging can significantly impact how quickly your home sells and for how much. Here are professional tips to make your property stand out.</p>
      
      <h3>Declutter and Depersonalize</h3>
      <p>Remove personal items and excess furniture to help buyers envision themselves in the space.</p>
      
      <h3>Neutral Color Palette</h3>
      <p>Use neutral colors that appeal to the widest range of buyers.</p>
      
      <h3>Maximize Natural Light</h3>
      <p>Open curtains, clean windows, and add mirrors to make spaces feel larger and brighter.</p>
    `,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    category: "Tips",
    author: "Lisa Thompson",
    date: "2024-01-03",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 6,
    title: "Market Analysis: Q1 2024 Property Trends",
    slug: "q1-2024-market-analysis",
    excerpt: "Comprehensive analysis of property market performance and future outlook.",
    content: `
      <h2>Q1 2024 Market Performance</h2>
      <p>The first quarter of 2024 showed interesting trends in the property market. Here's our comprehensive analysis.</p>
      
      <h3>Price Movements</h3>
      <p>Average property prices increased by 3.2% compared to the previous quarter.</p>
      
      <h3>Inventory Levels</h3>
      <p>Housing inventory remains below historical averages, contributing to competitive conditions.</p>
      
      <h3>Interest Rate Impact</h3>
      <p>Mortgage rate fluctuations continue to influence buyer behavior and market dynamics.</p>
    `,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    category: "Investing",
    author: "Robert Kim",
    date: "2024-01-01",
    readTime: "15 min read",
    featured: true
  }
];

export const getPopularPosts = () => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
};

export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string) => {
  return blogPosts.filter(post => post.category === category);
};