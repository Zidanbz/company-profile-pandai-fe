"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { Container } from "@/components/base/Container";
import { ArrowRight } from "lucide-react";

export const CtaSection: React.FC = () => {
  const t = useSiteText();
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <Container size="xl">
        <div className="rounded-[40px] bg-gradient-to-r from-[#052747] via-[#0066ad] to-[#06345d] p-10 sm:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          
          {/* Decorative Flowing Wave Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 1200 400" fill="none" className="w-full h-full">
              <path
                d="M-50,200 C200,350 450,50 750,220 C1000,320 1150,150 1250,200"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <path
                d="M0,100 C300,0 600,300 900,100 C1100,0 1200,150 1300,100"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Organic Wave Glow Blobs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-sky-400/30 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-300/20 blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-7 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t("pandai_cta_001")}</h2>
            <p className="text-sm sm:text-base text-sky-100 max-w-lg mx-auto font-normal">
              {t("pandai_cta_002")}</p>
            <div>
              <a
                href={t("pandai_cta_003")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-[#0077c8] bg-white hover:bg-sky-50 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                {t("pandai_cta_004")}<ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
