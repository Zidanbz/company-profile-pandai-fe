import type { Metadata } from "next";
import "./globals.css";

import { getSiteContent } from '@/lib/content/server';
import { contentDefaults, safeContentValue } from '@/lib/content/catalog';
export async function generateMetadata(): Promise<Metadata> {
  const content = { ...contentDefaults, ...await getSiteContent() };
  return {
    title: content.seo_meta_title, description: content.seo_meta_description,
    icons: { icon: safeContentValue('site_favicon', content.site_favicon) },
    openGraph: { type: 'website', locale: 'id_ID', title: content.seo_meta_title,
      description: content.seo_meta_description, siteName: content.site_name },
    twitter: { card: 'summary_large_image', title: content.seo_meta_title, description: content.seo_meta_description },
  };
}

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="pandai-theme"
          disableTransitionOnChange
        >
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
