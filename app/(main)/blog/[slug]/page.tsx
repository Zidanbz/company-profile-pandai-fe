import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/base/Container";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";
import { postsApi } from "@/lib/api/posts";

import { getSiteContent } from "@/lib/content/server";
import { contentDefaults } from "@/lib/content/catalog";

interface PageProps {
  params: { slug: string };
}

// Dynamic Metadata per SEO rule
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = { ...contentDefaults, ...await getSiteContent() };
  try {
    const post = await postsApi.getPublicPostBySlug(params.slug);
    return {
      title: `${post.title} | ${content.site_name}`,
      description: post.excerpt || content.seo_meta_description,
      openGraph: {
        title: post.title,
        description: post.excerpt || undefined,
        images: post.thumbnailUrl ? [post.thumbnailUrl] : [],
      },
    };
  } catch (e) {
    return {
      title: "Artikel Tidak Ditemukan | Pandai",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const content = { ...contentDefaults, ...await getSiteContent() };
  let post;
  try {
    post = await postsApi.getPublicPostBySlug(params.slug);
  } catch (error) {
    // If not found or API error during build
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnailUrl || undefined,
    datePublished: post.publishedAt || post.createdAt,
    author: {
      "@type": "Organization",
      name: content.site_name,
    },
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, () => String.fromCharCode(92) + 'u003c') }}
      />
      <Container size="lg">
        <BlogDetailContent post={post} brand={content.site_name} />
      </Container>
    </div>
  );
}
