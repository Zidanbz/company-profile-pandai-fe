"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { Container } from "@/components/base/Container";
import { Check, Building2, Users, Briefcase, Award } from "lucide-react";

export const AboutSection: React.FC = () => {
  const t = useSiteText();
  return (
    <section id="tentang" className="py-20 md:py-28 bg-white relative overflow-hidden scroll-mt-28">
      {/* Decorative Organic Wave Blobs in Background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-50/70 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

      {/* Subtle Wavy Line SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg viewBox="0 0 1440 600" fill="none" className="w-full h-full">
          <path
            d="M-100,200 C300,350 600,100 1000,250 C1300,350 1500,200 1600,300"
            stroke="#0077c8"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Building Photo Showcase */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-sky-100 shadow-2xl group">
              <img
                src={t("pandai_about_001")}
                alt={t("pandai_about_002")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 flex items-center justify-between shadow-lg">
                <span className="text-xs font-bold text-slate-800">{t("pandai_about_003")}</span>
                <span className="text-[11px] font-semibold text-[#0077c8]">{t("pandai_about_004")}</span>
              </div>
            </div>
          </div>

          {/* Right: Content & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 text-[#0077c8] text-xs font-bold uppercase tracking-wider border border-sky-100">
              {t("pandai_about_005")}</div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t("pandai_about_006")}</h2>

            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              {t("pandai_about_007")}</p>

            {/* Checklist */}
            <div className="space-y-3.5 pt-2">
              {[
                t("pandai_about_008"),
                t("pandai_about_009"),
                t("pandai_about_010"),
                t("pandai_about_011"),
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-[#0077c8] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Column Statistics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: t("pandai_about_012"), label: t("pandai_about_013") },
            { value: t("pandai_about_014"), label: t("pandai_about_015") },
            { value: t("pandai_about_016"), label: t("pandai_about_017") },
            { value: t("pandai_about_018"), label: t("pandai_about_019") },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                i === 0
                  ? "bg-[#0077c8] text-white border-[#0077c8] shadow-lg shadow-[#0077c8]/20"
                  : "bg-sky-50/70 border-sky-100 text-slate-800"
              }`}
            >
              <div className={`text-3xl sm:text-4xl font-black mb-1 ${i === 0 ? "text-white" : "text-[#0077c8]"}`}>
                {stat.value}
              </div>
              <div className={`text-xs sm:text-sm font-semibold ${i === 0 ? "text-sky-100" : "text-slate-600"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
