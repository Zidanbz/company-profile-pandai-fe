import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/base/Container";
import { BlogList } from "@/components/blog/BlogList";

import { getSiteContent } from '@/lib/content/server';
import { contentDefaults } from '@/lib/content/catalog';
export async function generateMetadata(): Promise<Metadata> {
  const content = { ...contentDefaults, ...await getSiteContent() };
  return { title: `${content.pandai_blog_013} | ${content.site_name}`, description: content.pandai_blog_015 };
}
export default async function BlogPage() {
  const content = { ...contentDefaults, ...await getSiteContent() };
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Container size="xl" className="space-y-12">
        {/* Header */}
        <div className="max-w-2xl text-left space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase block">
            {content.pandai_blog_013}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {content.pandai_blog_014}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {content.pandai_blog_015}
          </p>
        </div>

        {/* Blog Interactive List */}
        <BlogList />
      </Container>
    </div>
  );
}
