"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import { Container } from "@/components/base/Container";
import { Check, ArrowRight, Network, Server, Cloud, Code, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LayeredWave } from "@/components/ui/WaveDivider";

export const HeroSection: React.FC = () => {
  const t = useSiteText();
  return (
    <section id="hero" className="relative pt-32 pb-0 md:pt-40 md:pb-0 overflow-hidden bg-slate-950 text-white scroll-mt-28">
      {/* Cinematic data-center photo backdrop with Pandai blue contrast layers */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <img
          src={t("pandai_hero_001")}
          alt={t("pandai_hero_002")}
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.12]"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(2, 44, 84, 0.94) 0%, rgba(0, 92, 160, 0.88) 38%, rgba(0, 119, 200, 0.80) 68%, rgba(2, 132, 199, 0.70) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(2,15,35,0.65)_100%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      {/* 2. Stylized Decorative Shapes & Atmospheric Glow */}
      {/* Dynamic 3D Curved Flowing Vector Ribbons with Shadows */}
      <div className="absolute inset-x-0 top-1/4 pointer-events-none z-[1] opacity-35">
        <svg viewBox="0 0 1440 400" fill="none" className="w-full h-auto drop-shadow-[0_15px_35px_rgba(0,180,255,0.4)]">
          <path
            d="M-100,160 C320,320 420,30 780,180 C1140,320 1280,70 1540,210"
            stroke="url(#hero-shape-grad-1)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          <path
            d="M-50,230 C280,80 520,300 840,150 C1180,0 1340,260 1540,170"
            stroke="url(#hero-shape-grad-2)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="hero-shape-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0077c8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="hero-shape-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-28 left-1/3 w-80 h-80 rounded-full bg-blue-600/25 blur-3xl pointer-events-none z-[1]" />

      {/* 3. Main Hero Content Container */}
      <Container size="xl" className="relative z-10 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge with Pulse Glow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-xs font-semibold tracking-wider uppercase text-sky-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_10px_#f97316]" />
              {t("pandai_hero_003")}</div>

            {/* Main Headline with Text Drop Shadow */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.14] text-white drop-shadow-[0_4px_14px_rgba(0,20,50,0.55)]">
              {t("pandai_hero_004")}</h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-sky-100/95 leading-relaxed max-w-2xl font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
              {t("pandai_hero_005")}</p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={t("pandai_hero_006")}
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] shadow-[0_15px_30px_-5px_rgba(249,115,22,0.45)] hover:shadow-[0_20px_35px_-5px_rgba(249,115,22,0.55)] border border-orange-400/40 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2.5"
              >
                <span>{t("pandai_hero_007")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={t("pandai_hero_008")}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
              >
                {t("pandai_hero_009")}</a>
            </div>

            {/* Checkmarks with Glassmorphic Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-xs sm:text-sm text-sky-100">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
                <Check className="w-4 h-4 text-sky-300 stroke-[3]" />
                <span className="font-medium">{t("pandai_hero_010")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
                <Check className="w-4 h-4 text-sky-300 stroke-[3]" />
                <span className="font-medium">{t("pandai_hero_011")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
                <Check className="w-4 h-4 text-sky-300 stroke-[3]" />
                <span className="font-medium">{t("pandai_hero_012")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Ecosystem Graphic Card with Elevated Shadows & Sculpted Shape */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[430px] aspect-square rounded-[38px] bg-transparent p-6 sm:p-7 flex flex-col items-center justify-center text-white border-2 border-white/90">
              
              {/* Floating Stat Top Left with Drop Shadow */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3.5 -left-3.5 bg-white px-4 py-2 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,50,120,0.25)] border border-sky-100 flex items-center gap-2.5 z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#0077c8] shadow-[0_0_8px_#0077c8]" />
                <div className="text-left">
                  <p className="text-xs font-black text-[#0077c8]">{t("pandai_hero_013")}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{t("pandai_hero_014")}</p>
                </div>
              </motion.div>

              {/* Floating Stat Bottom Right with Drop Shadow */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3.5 -right-3.5 bg-white px-4 py-2 rounded-2xl shadow-[0_15px_30px_-5px_rgba(249,115,22,0.25)] border border-orange-100 flex items-center gap-2.5 z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]" />
                <div className="text-left">
                  <p className="text-xs font-black text-[#f97316]">{t("pandai_hero_015")}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{t("pandai_hero_016")}</p>
                </div>
              </motion.div>

              {/* Hub Ecosystem Nodes Graphic */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Connecting lines SVG with subtle animation glow */}
                <svg className="absolute inset-0 w-full h-full text-sky-200" viewBox="0 0 256 256">
                  <line x1="128" y1="128" x2="128" y2="40" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
                  <line x1="128" y1="128" x2="216" y2="90" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
                  <line x1="128" y1="128" x2="200" y2="210" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
                  <line x1="128" y1="128" x2="56" y2="210" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
                  <line x1="128" y1="128" x2="40" y2="90" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
                </svg>

                {/* Center Node (PANDAI) with pulse rings */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-[#0077c8] via-[#0284c7] to-[#38bdf8] text-white flex flex-col items-center justify-center shadow-[0_15px_35px_rgba(0,119,200,0.4)] border-4 border-white">
                  <div className="absolute -inset-2 rounded-full border-2 border-sky-300 animate-ping opacity-25 pointer-events-none" />
                  <span className="font-heading font-black text-xs tracking-wider">{t("pandai_hero_017")}</span>
                </div>

                {/* Satellite Node 1: Konsultasi (Top) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#0077c8] shadow-md group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1 drop-shadow">{t("pandai_hero_018")}</span>
                </div>

                {/* Satellite Node 2: Fiber Optik (Top Right) */}
                <div className="absolute top-14 right-2 flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#0077c8] shadow-md group-hover:scale-110 transition-transform">
                    <Network className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1 drop-shadow">{t("pandai_hero_019")}</span>
                </div>

                {/* Satellite Node 3: Cloud & VPS (Bottom Right) */}
                <div className="absolute bottom-4 right-6 flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#0077c8] shadow-md group-hover:scale-110 transition-transform">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1 drop-shadow">{t("pandai_hero_020")}</span>
                </div>

                {/* Satellite Node 4: Data Center (Bottom Left) */}
                <div className="absolute bottom-4 left-6 flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#0077c8] shadow-md group-hover:scale-110 transition-transform">
                    <Server className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1 drop-shadow">{t("pandai_hero_021")}</span>
                </div>

                {/* Satellite Node 5: Software (Top Left) */}
                <div className="absolute top-14 left-2 flex flex-col items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#0077c8] shadow-md group-hover:scale-110 transition-transform">
                    <Code className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1 drop-shadow">{t("pandai_hero_022")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Feature Ribbon Card (01, 02, 03, 04) - Sculpted Floating Pill Shape with Rich Shadows */}
        <div className="mt-14 sm:mt-20 relative z-20">
          <div className="rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(0,35,80,0.35)] p-5 sm:p-7 text-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="space-y-1 pt-2 md:pt-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#0077c8] font-extrabold text-xl">{t("pandai_hero_023")}</span>
                  <span className="font-bold text-base text-slate-900">{t("pandai_hero_024")}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{t("pandai_hero_025")}</p>
              </div>

              <div className="space-y-1 pt-3 md:pt-0 md:pl-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#0077c8] font-extrabold text-xl">{t("pandai_hero_026")}</span>
                  <span className="font-bold text-base text-slate-900">{t("pandai_hero_027")}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{t("pandai_hero_028")}</p>
              </div>

              <div className="space-y-1 pt-3 md:pt-0 md:pl-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#0077c8] font-extrabold text-xl">{t("pandai_hero_029")}</span>
                  <span className="font-bold text-base text-slate-900">{t("pandai_hero_030")}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{t("pandai_hero_031")}</p>
              </div>

              <div className="space-y-1 pt-3 md:pt-0 md:pl-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#f97316] font-extrabold text-xl">{t("pandai_hero_032")}</span>
                  <span className="font-bold text-base text-slate-900">{t("pandai_hero_033")}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{t("pandai_hero_034")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 5. Elegant Wave Transition */}
      <div className="relative mt-8 sm:mt-12">
        <LayeredWave fillColor="fill-white" />
      </div>
    </section>
  );
};
