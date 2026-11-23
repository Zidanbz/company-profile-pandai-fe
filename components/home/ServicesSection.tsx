"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { servicesApi } from "@/lib/api/services";
import { ServiceItemData } from "@/types";
import { isSafeContentUrl } from "@/lib/content/catalog";
import { Container } from "@/components/base/Container";
import { ArrowRight, Cloud, Code2, Lightbulb, Network, Sparkles, Check } from "lucide-react";
import { TopWave, BottomWave } from "@/components/ui/WaveDivider";

export const SERVICE_THEME_IMAGES: Record<string, string> = {
  "pandai-cloud-service": "/images/services-cloud-bg.jpg",
  "it-consulting": "/images/services-3d-spatial.jpg",
  "localoop-metro-e": "/images/hero-buildings.jpg",
  "software-development": "/images/about-skyscraper.jpg",
};



export const ServicesSection: React.FC = () => {
  const t = useSiteText();
const fallbackServices = [
  { number: "01", title: "Pandai Cloud Service", description: "Migrasi ke cloud dengan fleksibilitas, skalabilitas, dan keamanan tingkat tinggi.", tags: ["Cloud", "VPS", "Data Center"], image: "/images/pandai-cloud.jpg", imageAlt: "Infrastruktur cloud dan data center Pandai", imageLabel: "Cloud & Data Center", Icon: Cloud, link: false, slug: "pandai-cloud-service" },
  { number: "02", title: "IT Consulting", description: "Optimalkan infrastruktur teknologi Anda dengan strategi dan solusi yang tepat.", tags: ["Analisis", "Strategi", "Optimalisasi"], image: "/images/pandai-consulting.jpg", imageAlt: "Tim Pandai melakukan konsultasi teknologi informasi", imageLabel: "Strategi & Konsultasi", Icon: Lightbulb, link: false, slug: "it-consulting" },
  { number: "03", title: "Localoop & Metro-E", description: "Konektivitas berkecepatan tinggi, aman, dan berlatensi rendah antar-lokasi bisnis.", tags: ["Fiber Optik", "Metro Ethernet"], image: "/images/pandai-fiber.jpg", imageAlt: "Instalasi jaringan fiber optik Pandai", imageLabel: "Fiber Optik & Metro-E", Icon: Network, link: false, slug: "localoop-metro-e" },
  { number: "04", title: "Software Development", description: "Dari ide hingga peluncuran, kami bangun aplikasi sesuai tujuan bisnis Anda.", tags: ["Analytics", "Development", "Solutions"], image: "/images/pandai-software.jpg", imageAlt: "Tim pengembang software Pandai bekerja bersama", imageLabel: "Software & Digital Product", Icon: Code2, link: false, slug: "software-development" },
];
  const [records, setRecords] = React.useState<ServiceItemData[] | null>(null);
  React.useEffect(() => { servicesApi.getAllPublic().then(setRecords).catch(() => setRecords(null)); }, []);
  const icons: Record<string, typeof Cloud> = { Cloud, Code: Code2, Code2, Lightbulb, Network };
  const services = records === null ? fallbackServices : records.map((item, index) => {
    let tags: string[] = [];
    try { const parsed = JSON.parse(item.features || '[]'); if (Array.isArray(parsed)) tags = parsed.filter((v): v is string => typeof v === 'string'); } catch {}
    return { number: String(index + 1).padStart(2, '0'), title: item.title, description: item.description,
      tags, image: item.imageUrl && isSafeContentUrl(item.imageUrl, true) ? item.imageUrl : '/images/pandai-cloud.jpg',
      imageAlt: item.title, imageLabel: item.badge || item.title, Icon: icons[item.icon] || Network, link: true, slug: item.slug };
  });
  const [activeService, setActiveService] = React.useState(0);
  const selected = services[Math.min(activeService, services.length - 1)];
  const SelectedIcon = selected?.Icon || Network;

  return (
  <section id="layanan" className="relative bg-white scroll-mt-28">
    <div className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#062b50] text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <img src={t("pandai_services_032")} alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031d38]/95 via-[#034b7b]/80 to-[#062b50]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#031d38]/40 via-transparent to-[#031d38]/95" />
        <div className="absolute inset-0 bg-[#0066ad]/20 mix-blend-color" />
      </div>
      <div className="pointer-events-none absolute -right-36 top-20 h-[28rem] w-[28rem] rounded-full border border-cyan-100/15" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-40 h-[20rem] w-[20rem] rounded-full border border-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-sky-300/15 blur-[110px]" aria-hidden="true" />
      <TopWave fillColor="fill-white" />

      <div className="relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-8 sm:py-10">
        <Container size="xl">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100/30 bg-[#062b50]/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-50 shadow-lg backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-orange-300" /> {t("pandai_services_033")}</div>
              <h2 className="text-4xl font-black leading-[1.04] tracking-tight text-white drop-shadow sm:text-5xl xl:text-6xl">
                {t("pandai_services_034")}<span className="text-sky-200">{t("pandai_services_035")}</span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-sky-50/90 sm:text-base">
                {t("pandai_services_036")}</p>
              <a href={t("pandai_services_037")} className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/25 transition hover:-translate-y-0.5 hover:bg-orange-400">
                {t("pandai_services_038")}<ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-sky-100/85">
                {[t("pandai_services_039"), t("pandai_services_040"), t("pandai_services_041")].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-300" />{item}</span>
                ))}
              </div>
            </div>

            {selected && <div className="grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                {services.map(({ Icon, ...service }, index) => (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => setActiveService(index)}
                    aria-pressed={activeService === index}
                    className={`group flex min-h-[4.25rem] items-center gap-3 rounded-2xl border px-3 py-3 text-left backdrop-blur-md transition sm:min-h-0 sm:px-4 ${activeService === index ? "border-cyan-200/70 bg-white/20 shadow-lg shadow-slate-950/20" : "border-white/15 bg-[#062b50]/45 hover:border-white/35 hover:bg-white/10"}`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activeService === index ? "bg-cyan-100 text-[#0066ad]" : "bg-white/10 text-cyan-100"}`}><Icon className="h-4 w-4" /></span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-bold tracking-[0.15em] text-cyan-100/65">{service.number}</span>
                      <span className="block truncate text-xs font-bold text-white sm:text-sm">{service.title}</span>
                    </span>
                  </button>
                ))}
              </div>

              <article className="group relative min-h-[21rem] overflow-hidden rounded-[26px] border border-white/25 bg-[#062b50]/35 shadow-[0_28px_75px_-35px_rgba(0,8,30,0.95)] backdrop-blur-sm sm:min-h-[27rem]">
                <img key={selected.image} src={selected.image} alt={selected.imageAlt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031a32]/95 via-[#062b50]/40 to-[#062b50]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#062b50]/30 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-[#062b50]/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur-md">
                  <SelectedIcon className="h-3.5 w-3.5 text-cyan-200" /> {selected.imageLabel}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <span className="text-xs font-black tracking-[0.2em] text-cyan-200">{selected.number} / {String(services.length).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{selected.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-sky-50/85">{selected.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">{tag}</span>)}
                  </div>
                  {selected.link && <a href={`/services/${encodeURIComponent(selected.slug)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-100 transition hover:text-white">{t("service_detail_label")}<ArrowRight className="h-4 w-4" /></a>}
                </div>
              </article>
            </div>}
          </div>
        </Container>
      </div>
      <BottomWave fillColor="fill-white" />
    </div>
  </section>
  );
};
