import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { GallerySection } from "@/components/home/GallerySection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { BlogSection } from "@/components/home/BlogSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";
import { ContactSection } from "@/components/home/ContactSection";

import { getSiteContent } from "@/lib/content/server";
import { contentDefaults } from "@/lib/content/catalog";

export default async function HomePage() {
  const content = { ...contentDefaults, ...(await getSiteContent()) };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.site_name,
    url: "https://pandai.id",
    logo: content.site_logo,
    description: content.seo_meta_description,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.contact_address,
      addressLocality: content.contact_city,
      addressRegion: "Sulawesi Selatan",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: content.contact_phone,
      contactType: "customer service",
      email: content.contact_email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            () => String.fromCharCode(92) + "u003c",
          ),
        }}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <GallerySection />
      <PartnersSection />
      <BlogSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
