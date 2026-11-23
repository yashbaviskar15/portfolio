import type { MetadataRoute } from 'next';

const SITE_URL = 'https://yashbaviskar.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/YASH_BAVISKAR_CV.pdf`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
