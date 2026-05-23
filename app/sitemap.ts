import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = ['plumbing', 'electrical', 'ac', 'baking', 'painting', 'mechanic', 'barbing', 'carpentry', 'tailoring', 'photography', 'tech', 'logistics', 'cleaning', 'fashion', 'electronics', 'food'];

  const categoryUrls = categories.map((cat) => ({
    url: `https://www.josmkt.com.ng/services?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://www.josmkt.com.ng',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.josmkt.com.ng/become-seller',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...categoryUrls,
  ];
}
