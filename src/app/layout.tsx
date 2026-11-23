import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://yashbaviskar.me';
const TITLE = 'Cloud Support Engineer | AWS, Linux, Terraform, Docker';
const DESCRIPTION =
  'Yash Baviskar — Cloud Support Engineer. Investigates AWS EC2 status checks, CloudWatch metrics and Linux logs; works with Terraform (designed & validated) and Docker. Interactive Ubuntu-style desktop portfolio.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Yash Baviskar',
  },
  description: DESCRIPTION,
  applicationName: 'Yash Baviskar Portfolio',
  authors: [{ name: 'Yash Baviskar', url: SITE_URL }],
  creator: 'Yash Baviskar',
  keywords: [
    'Yash Baviskar',
    'Cloud Support Engineer',
    'AWS',
    'EC2',
    'CloudWatch',
    'Linux',
    'Terraform',
    'Docker',
    'CI/CD',
    'Prometheus',
    'Grafana',
    'Jalgaon',
    'Germany relocation',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Yash Baviskar — Cloud Support Engineer',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yash Baviskar — Cloud Support Engineer (AWS, Linux, Terraform, Docker)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#110519',
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Yash Baviskar',
  jobTitle: 'Cloud Support Engineer',
  url: SITE_URL,
  sameAs: ['https://github.com/yashbaviskar15', 'https://linkedin.com/in/yashbaviskar15'],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: "KCES's Institute of Management and Research, Jalgaon (KBCNMU)",
  },
  knowsAbout: [
    'Amazon Web Services (AWS) EC2 & CloudWatch',
    'Linux log analysis',
    'Docker containers',
    'Terraform (Infrastructure as Code)',
    'CI/CD automation',
    'Prometheus & Grafana',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'IT Digi Solution',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-[#110519] text-neutral-200 antialiased selection:bg-orange-600 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
