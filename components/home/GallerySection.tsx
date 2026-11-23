"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { Container } from "@/components/base/Container";

export const GallerySection: React.FC = () => {
  const t = useSiteText();
  return (
    <section id="galeri" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <Container size="xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 text-[#0077c8] text-xs font-bold uppercase tracking-wider border border-sky-100">
            {t("pandai_gallery_001")}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("pandai_gallery_002")}</h2>
          <p className="text-sm sm:text-base text-slate-500">
            {t("pandai_gallery_003")}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Large Card (Left) */}
          <div className="lg:col-span-6 rounded-[32px] overflow-hidden min-h-[380px] lg:min-h-full relative shadow-xl border border-sky-100 group">
            <img
              src={t("pandai_gallery_004")}
              alt={t("pandai_gallery_005")}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block mb-1">
                {t("pandai_gallery_006")}</span>
              <p className="text-base sm:text-lg font-bold">
                {t("pandai_gallery_007")}</p>
            </div>
          </div>

          {/* 4 Cards Grid (Right) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Tim */}
            <div className="rounded-[28px] overflow-hidden min-h-[200px] relative shadow-lg border border-sky-100 group">
              <img
                src={t("pandai_gallery_008")}
                alt={t("pandai_gallery_009")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 block">
                  {t("pandai_gallery_010")}</span>
                <p className="text-xs sm:text-sm font-bold">
                  {t("pandai_gallery_011")}</p>
              </div>
            </div>

            {/* Card 2: Server */}
            <div className="rounded-[28px] overflow-hidden min-h-[200px] relative shadow-lg border border-sky-100 group">
              <img
                src={t("pandai_gallery_012")}
                alt={t("pandai_gallery_013")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 block">
                  {t("pandai_gallery_014")}</span>
                <p className="text-xs sm:text-sm font-bold">
                  {t("pandai_gallery_015")}</p>
              </div>
            </div>

            {/* Card 3: Fiber Optik */}
            <div className="rounded-[28px] overflow-hidden min-h-[200px] relative shadow-lg border border-sky-100 group">
              <img
                src={t("pandai_gallery_016")}
                alt={t("pandai_gallery_017")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 block">
                  {t("pandai_gallery_018")}</span>
                <p className="text-xs sm:text-sm font-bold">
                  {t("pandai_gallery_019")}</p>
              </div>
            </div>

            {/* Card 4: Software Dev */}
            <div className="rounded-[28px] overflow-hidden min-h-[200px] relative shadow-lg border border-sky-100 group">
              <img
                src={t("pandai_gallery_020")}
                alt={t("pandai_gallery_021")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 block">
                  {t("pandai_gallery_022")}</span>
                <p className="text-xs sm:text-sm font-bold">
                  {t("pandai_gallery_023")}</p>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};
