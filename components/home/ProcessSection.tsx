"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { Container } from "@/components/base/Container";

export const ProcessSection: React.FC = () => {
  const t = useSiteText();
  const steps = [
    {
      number: 1,
      color: "bg-[#f97316]",
      title: t("pandai_process_001"),
      desc: t("pandai_process_002"),
    },
    {
      number: 2,
      color: "bg-[#0077c8]",
      title: t("pandai_process_003"),
      desc: t("pandai_process_004"),
    },
    {
      number: 3,
      color: "bg-[#0077c8]",
      title: t("pandai_process_005"),
      desc: t("pandai_process_006"),
    },
    {
      number: 4,
      color: "bg-[#f97316]",
      title: t("pandai_process_007"),
      desc: t("pandai_process_008"),
    },
  ];

  return (
    <section id="proses" className="py-20 md:py-28 bg-white relative overflow-hidden scroll-mt-28">
      {/* Subtle Wavy Watermark Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 400" fill="none" className="w-full h-full">
          <path
            d="M0,100 C300,250 600,20 900,180 C1200,320 1350,50 1440,120"
            stroke="#0077c8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <Container size="xl" className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 text-[#0077c8] text-xs font-bold uppercase tracking-wider border border-sky-100 shadow-sm">
            {t("pandai_process_009")}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("pandai_process_010")}</h2>
        </div>

        {/* Stepper with Wavy connecting line */}
        <div className="relative">
          {/* Organic Wave Connecting Curve with Gradient Glow */}
          <div className="hidden md:block absolute top-7 left-14 right-14 h-16 -z-0 pointer-events-none">
            <svg
              viewBox="0 0 1000 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="stepperWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="35%" stopColor="#0077c8" />
                  <stop offset="70%" stopColor="#0077c8" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 C160,5 200,65 360,35 C520,5 560,65 720,35 C880,5 920,65 1000,35"
                stroke="url(#stepperWaveGrad)"
                strokeWidth="3.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                className="opacity-60"
              />
              <path
                d="M0,35 C160,5 200,65 360,35 C520,5 560,65 720,35 C880,5 920,65 1000,35"
                stroke="url(#stepperWaveGrad)"
                strokeWidth="1.5"
                className="opacity-40"
              />
            </svg>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center text-center px-2 group">
                <div
                  className={`w-14 h-14 rounded-2xl ${s.color} text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-${s.color}/30 mb-6 ring-8 ring-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  {s.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[220px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
