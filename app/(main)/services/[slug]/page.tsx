import React, { cache } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/base/Container';
import { getSiteContent } from '@/lib/content/server';
import { contentDefaults, isSafeContentUrl } from '@/lib/content/catalog';
import type { ServiceItemData } from '@/types';

interface Props { params: { slug: string } }
const getService = cache(async (slug: string): Promise<ServiceItemData | null> => {
  const base = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';
  const response = await fetch(`${base}/services/${encodeURIComponent(slug)}`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Rincian layanan belum dapat dimuat');
  const result = await response.json();
  if (!result.success) throw new Error('Rincian layanan belum dapat dimuat');
  return result.data;
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [service, content] = await Promise.all([getService(params.slug), getSiteContent()]);
  return { title: `${service?.title || 'Layanan'} | ${content.site_name || contentDefaults.site_name}`, description: service?.description };
}
export default async function ServicePage({ params }: Props) {
  const [service, stored] = await Promise.all([getService(params.slug), getSiteContent()]);
  if (!service || !service.isActive) notFound();
  const content = { ...contentDefaults, ...stored };
  let features: string[] = [];
  try {
    const parsed = JSON.parse(service.features || '[]');
    if (Array.isArray(parsed)) features = parsed.filter((item): item is string => typeof item === 'string');
  } catch { /* Legacy invalid feature data is omitted. */ }
  const image = service.imageUrl && isSafeContentUrl(service.imageUrl, true) ? service.imageUrl : '';
  return <div className="pt-32 pb-24 bg-white min-h-screen">
    <Container size="xl">
      <Link href="/#layanan" className="text-sm font-semibold text-sky-700">← {content.service_back_label}</Link>
      <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          {service.badge && <span className="inline-block rounded-full px-4 py-2 bg-sky-50 text-sky-700 text-sm font-bold">{service.badge}</span>}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">{service.title}</h1>
          <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-line">{service.description}</p>
          <Link href="/#kontak" className="inline-block rounded-xl px-6 py-3 bg-orange-500 text-white font-bold">{content.service_contact_label}</Link>
        </div>
        {image && <img src={image} alt={service.title} className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl" />}
      </div>
      {features.length > 0 && <section className="mt-16 rounded-3xl bg-sky-50 p-8">
        <h2 className="text-2xl font-bold text-slate-900">{content.service_features_label}</h2>
        <ul className="mt-6 grid sm:grid-cols-2 gap-4">{features.map((feature,index) => <li key={index} className="text-slate-700">✓ {feature}</li>)}</ul>
      </section>}
    </Container>
  </div>;
}
