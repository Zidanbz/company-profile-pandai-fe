"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { postsApi } from "@/lib/api/posts";
import { Post } from "@/types";
import Link from "next/link";
import { Container } from "@/components/base/Container";
import { ArrowRight, Cloud, Network, Code } from "lucide-react";

export const BlogSection: React.FC = () => {
  const t = useSiteText();
  const [posts, setPosts] = React.useState<Post[]>([]);
  React.useEffect(() => { postsApi.getPublicPosts({ limit: 3 }).then(result => setPosts(result.posts)).catch(() => setPosts([])); }, []);
  const blogs = posts.map(post => ({ slug: post.slug, title: post.title, excerpt: post.excerpt || '',
    category: 'INSIGHT', readTime: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('id-ID') : '',
    icon: <Code className="w-8 h-8 text-white" />, color: 'from-[#0066ad] to-[#0077c8]' }));


  return (
    <section id="blog" className="py-20 md:py-28 bg-white dark:bg-slate-950 scroll-mt-28">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-100 dark:border-slate-800">
              {t("pandai_blog_013")}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {t("pandai_blog_014")}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              {t("pandai_blog_015")}</p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#f97316] hover:text-[#ea580c] transition-colors shrink-0"
          >
            {t("pandai_blog_016")}<ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <article
              key={b.slug}
              className="rounded-3xl border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Banner */}
                <div className={`h-40 bg-gradient-to-tr ${b.color} flex items-center justify-center`}>
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md">
                    {b.icon}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold text-[#0077c8] dark:text-sky-400 tracking-wider uppercase mb-2 block">
                    {b.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug group-hover:text-[#0077c8] transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs border-t border-slate-50 dark:border-slate-800">
                <span className="text-slate-400 font-medium">{b.readTime}</span>
                <Link
                  href={`/blog/${b.slug}`}
                  className="font-bold text-[#f97316] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  {t("pandai_blog_017")}<ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
