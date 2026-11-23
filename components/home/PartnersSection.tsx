"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/base/Container";
import { motion } from "framer-motion";
import { partnersApi } from "@/lib/api/partners";
import { PartnerLogoData } from "@/types";
import {
  Handshake,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
} from "lucide-react";

// Default Strategic Partners (Principals / Vendors / Providers) - 100% HD Vectors
const DEFAULT_PARTNERS: PartnerLogoData[] = [
  {
    id: 1,
    name: "HERZA Digital",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="10" y="44" font-family="\'Arial Black\', Impact, sans-serif" font-weight="900" font-size="32" fill="#212529" letter-spacing="2">HERZ</text><path d="M125 18L130 18L148 44H138L125 24V18Z" fill="#E30613"/><text x="142" y="44" font-family="\'Arial Black\', Impact, sans-serif" font-weight="900" font-size="32" fill="#212529">A</text></svg>',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Biznet InternetExchange",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 210 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 16C15 16 32 16 32 30C32 38 24 43 24 43C36 43 45 50 42 58C39 65 24 64 15 54C22 55 28 53 28 48C28 44 22 40 18 40V16Z" fill="#00AEEF"/><ellipse cx="23" cy="28" rx="4" ry="5" fill="#FFFFFF"/><ellipse cx="25" cy="50" rx="4" ry="4" fill="#FFFFFF"/><text x="48" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#1A1A1A">Biznet</text><text x="48" y="52" font-family="Arial, sans-serif" font-weight="600" font-size="13" fill="#00AEEF" letter-spacing="0.5">InternetExchange</text></svg>',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "IDNIC",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="38" cy="35" rx="26" ry="16" transform="rotate(-30 38 35)" stroke="#0072BC" stroke-width="5" fill="none"/><circle cx="34" cy="30" r="10" fill="#002D62"/><path d="M22 42C30 48 48 48 54 36" stroke="#00A859" stroke-width="3" stroke-linecap="round"/><text x="75" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="28" fill="#002D62" letter-spacing="-0.5">idnic</text><text x="145" y="27" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="10" fill="#002D62">indonesia</text><text x="145" y="38" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="10" fill="#002D62">network</text><text x="145" y="49" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="10" fill="#002D62">information</text><text x="145" y="60" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="10" fill="#002D62">centre</text></svg>',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    name: "Bank BTN",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="18" width="30" height="5" rx="2.5" fill="#ED1C24"/><text x="15" y="48" font-family="\'Arial Black\', Impact, sans-serif" font-weight="900" font-size="38" fill="#005BAA">btn</text></svg>',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 5,
    name: "Moratelindo",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 48C18 32 25 18 36 24C44 29 40 46 48 48C56 50 62 30 68 36C70 38 68 46 62 48C52 50 44 38 38 32C30 26 25 36 22 48H15Z" fill="#E30613"/><text x="75" y="42" font-family="\'Century Gothic\', Arial, sans-serif" font-weight="900" font-size="24" fill="#1C1D1F">Moratelindo</text><text x="78" y="55" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="9" fill="#E30613" letter-spacing="1.5">broadband company</text></svg>',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 6,
    name: "pakAImuka",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="35" r="18" stroke="#1A1A1A" stroke-width="2" fill="none"/><path d="M22 28Q24 24 28 28M34 28Q36 24 40 28" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><path d="M30 30V35H27" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><path d="M25 42Q30 46 35 42" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><text x="56" y="36" font-family="\'Century Gothic\', Arial, sans-serif" font-weight="700" font-size="19" fill="#1A1A1A">pak</text><text x="92" y="36" font-family="\'Century Gothic\', Arial, sans-serif" font-weight="900" font-size="20" fill="#E30613">AI</text><text x="115" y="36" font-family="\'Century Gothic\', Arial, sans-serif" font-weight="700" font-size="19" fill="#1A1A1A">muka</text><text x="56" y="49" font-family="Arial, sans-serif" font-weight="600" font-size="7.5" fill="#555555" letter-spacing="0.4">Your Biometric Security System</text></svg>',
    sortOrder: 6,
    isActive: true,
  },
  {
    id: 7,
    name: "Pandai",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 190 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M125 15C135 15 145 22 142 32C138 27 132 25 125 25C132 28 136 34 133 42C128 35 120 34 112 36C120 40 124 48 118 54C108 45 98 46 90 50C100 42 108 26 125 15Z" fill="#38B6FF"/><text x="15" y="44" font-family="\'Trebuchet MS\', Arial, sans-serif" font-weight="700" font-size="34" fill="#0275B1">Pandai</text><text x="18" y="58" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="8.5" fill="#0275B1" letter-spacing="0.5">pintu data indonesia</text></svg>',
    sortOrder: 7,
    isActive: true,
  },
  {
    id: 8,
    name: "APJII",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="70" height="50" rx="10" fill="#0047BA"/><text x="40" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">APJII</text><text x="68" y="24" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="7" fill="#FFFFFF">TM</text><line x1="85" y1="12" x2="85" y2="58" stroke="#0047BA" stroke-width="2"/><text x="94" y="23" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="8.5" fill="#0047BA">Asosiasi</text><text x="94" y="33" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="8.5" fill="#0047BA">Penyelenggara</text><text x="94" y="43" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="8.5" fill="#0047BA">Jasa Internet</text><text x="94" y="53" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="8.5" fill="#0047BA">Indonesia</text><text x="120" y="65" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="5" fill="#555555" text-anchor="middle" letter-spacing="0.5">INDONESIA INTERNET SERVICE PROVIDER ASSOCIATION</text></svg>',
    sortOrder: 8,
    isActive: true,
  },
  {
    id: 9,
    name: "Matrix NAP Info",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 190 70" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="15" y="44" font-family="\'Arial Black\', Impact, sans-serif" font-style="italic" font-weight="900" font-size="32" fill="#1A1A1A">matri</text><path d="M125 18L145 44H135L120 24L125 18Z" fill="#E30613"/><path d="M142 18L122 44H132L147 24L142 18Z" fill="#0047BA"/><text x="15" y="58" font-family="Arial, sans-serif" font-weight="700" font-size="8.5" fill="#1A1A1A" letter-spacing="0.5">Quality Reliability Speed</text></svg>',
    sortOrder: 9,
    isActive: true,
  },
  {
    id: 10,
    name: "Hytera",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M110 22C118 20 128 24 135 30C125 28 116 27 110 22Z" fill="#78BE20"/><path d="M112 28C124 28 134 35 140 42C128 38 118 35 112 28Z" fill="#005A9C"/><text x="15" y="46" font-family="\'Century Gothic\', Arial, sans-serif" font-weight="800" font-size="30" fill="#2B2B2B">Hytera</text></svg>',
    sortOrder: 10,
    isActive: true,
  },
  {
    id: 11,
    name: "DATABUMI",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="22" stroke="#002D62" stroke-width="3" fill="#FFFFFF"/><ellipse cx="35" cy="35" rx="10" ry="22" stroke="#002D62" stroke-width="2"/><line x1="13" y1="35" x2="57" y2="35" stroke="#002D62" stroke-width="2"/><line x1="16" y1="25" x2="54" y2="25" stroke="#002D62" stroke-width="1.5"/><line x1="16" y1="45" x2="54" y2="45" stroke="#002D62" stroke-width="1.5"/><text x="68" y="38" font-family="\'Arial Black\', Arial, sans-serif" font-weight="900" font-size="24" fill="#002D62" letter-spacing="1">DATABUMI</text><text x="69" y="50" font-family="Arial, sans-serif" font-weight="600" font-size="6.5" fill="#555555" letter-spacing="0.2">Surveying &amp; Mapping | Software Developer | IoT | GIS</text></svg>',
    sortOrder: 11,
    isActive: true,
  },
  {
    id: 12,
    name: "NTT",
    category: "PARTNER",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="18" stroke="#0055B8" stroke-width="5" fill="none"/><circle cx="35" cy="35" r="7" fill="#0055B8"/><path d="M35 17C45 17 53 25 53 35" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><text x="68" y="44" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#1C1D1F" letter-spacing="1">NTT</text></svg>',
    sortOrder: 12,
    isActive: true,
  },
];

// Default Enterprise Clients (Institutions / Corporates / Enterprise) - 100% HD Vectors
const DEFAULT_CLIENTS: PartnerLogoData[] = [
  {
    id: 101,
    name: "Trans Hybrid",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="24" width="7" height="7" fill="#FDB813"/><rect x="23" y="16" width="7" height="7" fill="#E30613"/><rect x="31" y="24" width="7" height="7" fill="#8B2183"/><rect x="23" y="32" width="7" height="7" fill="#00AEEF"/><text x="44" y="34" font-family="\'Brush Script MT\', \'Trebuchet MS\', cursive, sans-serif" font-size="22" font-weight="bold" fill="#1C1D1F">Trans Hybrid</text><path d="M20 48C45 52 80 50 140 44" stroke="#1C1D1F" stroke-width="1.5" stroke-linecap="round" fill="none"/><text x="45" y="54" font-family="Arial, sans-serif" font-weight="700" font-size="6.5" fill="#1C1D1F" letter-spacing="0.8">YOUR TRUSTED PARTNER</text></svg>',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 102,
    name: "Pemprov Sulsel",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 10L52 20V45C52 56 35 62 35 62C35 62 18 56 18 45V20L35 10Z" fill="#D71920" stroke="#FDB813" stroke-width="2"/><circle cx="35" cy="36" r="11" fill="#FDB813"/><text x="64" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="#1C1D1F">PEMERINTAH</text><text x="64" y="48" font-family="Arial, sans-serif" font-weight="900" font-size="13" fill="#D71920">PROVINSI SULSEL</text></svg>',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 103,
    name: "Vasaka Hotel",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="15" y="44" font-family="\'Brush Script MT\', \'Lucida Handwriting\', cursive, sans-serif" font-size="34" font-weight="bold" fill="#8B1D2C">Vasaka</text><text x="110" y="46" font-family="Arial, sans-serif" font-weight="700" font-size="10" fill="#2B2B2B" letter-spacing="1">HOTEL</text></svg>',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 104,
    name: "BAKTI KOMDIGI",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="10" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#003366" letter-spacing="1.5">B</text><path d="M37 38L47 16L57 38H49L47 33L45 38H37Z" fill="#003366"/><polygon points="47,10 44,14 50,14" fill="#E30613"/><text x="59" y="38" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#003366" letter-spacing="1.5">KTI</text><text x="10" y="56" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#003366" letter-spacing="2">KOMDIGI</text></svg>',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 105,
    name: "Bank Indonesia",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 14L52 24V44L35 54L18 44V24L35 14Z" stroke="#003366" stroke-width="2.5" fill="#F4F8FC"/><text x="35" y="41" font-family="\'Times New Roman\', serif" font-weight="bold" font-size="20" fill="#003366" text-anchor="middle">BI</text><text x="64" y="34" font-family="\'Times New Roman\', serif" font-weight="bold" font-size="16" fill="#003366" letter-spacing="1">BANK INDONESIA</text><text x="65" y="46" font-family="Arial, sans-serif" font-weight="700" font-size="6.5" fill="#003366" letter-spacing="0.5">BANK SENTRAL REPUBLIK INDONESIA</text></svg>',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 106,
    name: "Borwita Citra Prima",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 210 70" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="15" y="42" font-family="\'Arial Black\', Arial, sans-serif" font-weight="900" font-size="21" fill="#1C1D1F">BORW</text><path d="M88 24L93 42L98 24H103L95 45L86 24H88Z" fill="#E30613"/><text x="100" y="42" font-family="\'Arial Black\', Arial, sans-serif" font-weight="900" font-size="21" fill="#1C1D1F">ITA</text><text x="82" y="54" font-family="Arial, sans-serif" font-weight="700" font-size="8" fill="#555555" letter-spacing="1">CITRA PRIMA</text></svg>',
    sortOrder: 6,
    isActive: true,
  },
  {
    id: 107,
    name: "BSS Parking",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 170 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 18L38 14V44L25 48V18Z" fill="#005A9C"/><path d="M38 14L48 20V50L38 44V14Z" fill="#78BE20"/><text x="32" y="34" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="#FFFFFF">BSS</text><text x="24" y="58" font-family="Arial, sans-serif" font-weight="700" font-size="7" fill="#1C1D1F" letter-spacing="0.5">BSS PARKING</text></svg>',
    sortOrder: 7,
    isActive: true,
  },
  {
    id: 108,
    name: "CL Mining",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20C32 16 48 24 45 42C42 52 30 54 22 46" stroke="#4A5568" stroke-width="7" stroke-linecap="round"/><path d="M42 22C46 18 52 18 56 22" stroke="#F6AD55" stroke-width="4" stroke-linecap="round"/><text x="62" y="46" font-family="\'Arial Black\', Impact, sans-serif" font-weight="900" font-size="34" fill="#2D3748">CL</text></svg>',
    sortOrder: 8,
    isActive: true,
  },
  {
    id: 109,
    name: "Bank Mandiri",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 190 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M85 24C100 16 125 18 140 24C130 20 105 21 95 27Z" fill="#FDB813"/><path d="M95 27C115 18 135 22 145 28C132 23 110 24 100 30Z" fill="#F39200"/><text x="15" y="45" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="#002D62" letter-spacing="-0.5">mandiri</text></svg>',
    sortOrder: 9,
    isActive: true,
  },
  {
    id: 110,
    name: "Sari Roti",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 190 70" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="16" width="130" height="34" rx="4" fill="#14234B"/><text x="80" y="40" font-family="\'Arial Black\', Impact, sans-serif" font-weight="900" font-size="19" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">SARI ROTI</text><ellipse cx="80" cy="54" rx="8" ry="7" stroke="#FDB813" stroke-width="2.5" fill="none"/><path d="M80 50C83 50 85 52 84 55C83 57 80 58 77 56" stroke="#FDB813" stroke-width="2" fill="none"/></svg>',
    sortOrder: 10,
    isActive: true,
  },
  {
    id: 111,
    name: "Ciputra Group",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 18L52 38H45L40 28L35 38H28L40 18Z" fill="#007A3D"/><circle cx="40" cy="24" r="2.5" fill="#007A3D"/><text x="18" y="54" font-family="\'Times New Roman\', serif" font-weight="bold" font-size="18" fill="#1C1D1F" letter-spacing="1">CIPUTRA</text></svg>',
    sortOrder: 11,
    isActive: true,
  },
  {
    id: 112,
    name: "KIMA",
    category: "CLIENT",
    logoUrl: "",
    svgContent: '<svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 44C24 38 28 32 30 26C34 30 36 34 34 40C32 43 28 45 26 44Z" fill="#856404"/><path d="M30 46C30 38 36 32 40 24C46 32 46 40 40 46Z" fill="#FDB813"/><text x="52" y="44" font-family="\'Times New Roman\', serif" font-weight="bold" font-size="28" fill="#1C1D1F" letter-spacing="2">KIMA</text></svg>',
    sortOrder: 12,
    isActive: true,
  },
];

export const PartnersSection: React.FC = () => {
  const siteText = useSiteText();
  // Legacy CMS values contain escaped ampersands; render plain text, never HTML.
  const t = (key: string) => siteText(key).replace(/&amp;/gi, "&");
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogoData[]>(DEFAULT_PARTNERS);
  const [clientLogos, setClientLogos] = useState<PartnerLogoData[]>(DEFAULT_CLIENTS);

  useEffect(() => {
    partnersApi
      .getAllPublic()
      .then((data) => {
        if (Array.isArray(data)) {
          const partners = data.filter((item) => (item.category || "PARTNER").toUpperCase() === "PARTNER");
          const clients = data.filter((item) => item.category?.toUpperCase() === "CLIENT");

          setPartnerLogos(partners);
          setClientLogos(clients);
        }
      })
      .catch(() => {
        // Fallback to defaults
      });
  }, []);

  // Triple lists for seamless, uninterrupted infinite continuous motion
  const loopPartners = [...partnerLogos, ...partnerLogos, ...partnerLogos];
  const loopClients = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section
      id="mitra"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-gradient-to-b from-white dark:from-slate-950 via-slate-50/60 dark:via-slate-900/60 to-white dark:to-slate-950 overflow-hidden scroll-mt-28 sm:scroll-mt-36"
    >
      
      {/* ── Soft Ambient Lighting in Pandai Blue & Emerald ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sky-100/40 dark:bg-blue-950/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-emerald-50/50 dark:bg-emerald-950/20 rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        
        {/* ── Distinctive Header Section (With Safe Padding Below Fixed Navbar) ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 border border-sky-200/80 dark:border-slate-700 shadow-sm text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
            {t("pandai_partners_001")}</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t("pandai_partners_002")}<span className="text-[#0077c8] dark:text-sky-400">{t("pandai_partners_003")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
            {t("pandai_partners_004")}</p>
        </div>

        {/* ── Showcase Container With Modern Card Bays ── */}
        <div className="space-y-12 max-w-7xl mx-auto">

          {/* ════════════ TRACK 1: MITRA & PARTNER ════════════ */}
          <div className="space-y-4">
            
            {/* Row Category Badge */}
            <div className="flex flex-col items-center justify-center gap-3 px-2 text-center">
              <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                  <Handshake className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {t("pandai_partners_005")}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 border border-sky-100 dark:border-slate-800">
                  {t("pandai_partners_006")}</span>
              </div>
            </div>

            {/* Logo Marquee Track inside Uniform Floating Capsules */}
            <div className="relative flex overflow-hidden select-none py-2 group">
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white dark:from-slate-950 to-transparent sm:w-20" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white dark:from-slate-950 to-transparent sm:w-20" />
              <motion.div
                animate={{ x: ["0%", "-33.333%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                className="flex items-center gap-4 sm:gap-6 shrink-0 pr-4 sm:pr-6 group-hover:[animation-play-state:paused]"
              >
                {loopPartners.map((partner, idx) => (
                  <div
                    key={`partner-${partner.id}-${idx}`}
                    className="h-20 sm:h-24 min-w-[180px] sm:min-w-[210px] px-6 sm:px-7 rounded-2xl bg-white border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0 group/card cursor-pointer"
                    title={partner.name}
                  >
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-9 sm:h-12 w-auto max-w-[155px] object-contain group-hover/card:scale-105 transition-transform duration-300"
                      />
                    ) : partner.svgContent ? (
                      <img
                        className="h-10 w-auto max-w-[165px] object-contain"
                        src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(partner.svgContent)}`} alt={partner.name}
                      />
                    ) : (
                      <span className="font-bold text-sm sm:text-base tracking-tight text-slate-800">
                        {partner.name}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ════════════ ACCENT DIVIDER ════════════ */}
          <div className="relative flex items-center justify-center py-2">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-[11px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
              {t("pandai_partners_010")}</div>
          </div>

          {/* ════════════ TRACK 2: CLIENT ════════════ */}
          <div className="space-y-4">
            
            {/* Row Category Badge */}
            <div className="flex flex-col items-center justify-center gap-3 px-2 text-center">
              <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {t("pandai_partners_011")}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                  {t("pandai_partners_012")}</span>
              </div>
            </div>

            {/* Reverse Logo Marquee Track inside Uniform Floating Capsules */}
            <div className="relative flex overflow-hidden select-none py-2 group">
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white dark:from-slate-950 to-transparent sm:w-20" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white dark:from-slate-950 to-transparent sm:w-20" />
              <motion.div
                animate={{ x: ["-33.333%", "0%"] }}
                transition={{ duration: 45, ease: "linear", repeat: Infinity }}
                className="flex items-center gap-4 sm:gap-6 shrink-0 pr-4 sm:pr-6 group-hover:[animation-play-state:paused]"
              >
                {loopClients.map((client, idx) => (
                  <div
                    key={`client-${client.id}-${idx}`}
                    className="h-20 sm:h-24 min-w-[180px] sm:min-w-[210px] px-6 sm:px-7 rounded-2xl bg-white border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0 group/card cursor-pointer"
                    title={client.name}
                  >
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="h-9 sm:h-12 w-auto max-w-[155px] object-contain group-hover/card:scale-105 transition-transform duration-300"
                      />
                    ) : client.svgContent ? (
                      <img className="h-10 w-auto max-w-[165px] object-contain" src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(client.svgContent)}`} alt={client.name} />
                    ) : (
                      <span className="font-bold text-sm sm:text-base tracking-tight text-slate-800">
                        {client.name}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>

        {/* ── Bottom Trust Metric Ribbon ── */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800 max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
            <span>{t("pandai_partners_016")}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t("pandai_partners_017")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{t("pandai_partners_018")}</span>
          </div>
        </div>

      </Container>
    </section>
  );
};
