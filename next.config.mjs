/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Linting is run explicitly via `npm run lint` / `npm run typecheck`.
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/(.*).pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'inline; filename="YASH_BAVISKAR_CV.pdf"' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/(.*).docx',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/cv', destination: '/YASH_BAVISKAR_CV.pdf', permanent: false },
      { source: '/resume', destination: '/YASH_BAVISKAR_CV.pdf', permanent: false },
      { source: '/github', destination: 'https://github.com/yashbaviskar15', permanent: false },
      { source: '/linkedin', destination: 'https://linkedin.com/in/yashbaviskar15', permanent: false },
    ];
  },
};

export default nextConfig;
