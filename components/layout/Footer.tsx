"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React from "react";
import Link from "next/link";
import { Container } from "../base/Container";
import { Mail, Phone, MapPin } from "lucide-react";
import { TopWave } from "@/components/ui/WaveDivider";

export const Footer: React.FC = () => {
  const t = useSiteText();
  return (
    <footer className="w-full bg-[#062b50] text-white relative">
      {/* Top Wave Entry from Contact Section */}
      <TopWave fillColor="fill-white" />

      {/* Main Footer */}
      <div className="py-14 sm:py-16 border-b border-white/15">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: Brand Info (span 2) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex rounded-xl bg-white px-3 py-1.5 shadow-sm">
                <img
                  src={t("site_logo")}
                  alt={t("pandai_footer_002")}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-sky-100 max-w-sm leading-relaxed">
                {t("pandai_footer_003")}</p>
            </div>

            {/* Column 2: Perusahaan */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-4">
                {t("pandai_footer_004")}</h4>
              <ul className="space-y-2.5 text-sm text-sky-100">
                <li><a href={t("pandai_footer_005")} className="hover:text-white transition-colors">{t("pandai_footer_006")}</a></li>
                <li><a href={t("pandai_footer_007")} className="hover:text-white transition-colors">{t("pandai_footer_008")}</a></li>
                <li><a href={t("pandai_footer_009")} className="hover:text-white transition-colors">{t("pandai_footer_010")}</a></li>
                <li><a href={t("pandai_footer_011")} className="hover:text-white transition-colors">{t("pandai_footer_012")}</a></li>
                <li><a href={t("pandai_footer_013")} className="hover:text-white transition-colors">{t("pandai_footer_014")}</a></li>
                <li><a href={t("pandai_footer_015")} className="hover:text-white transition-colors">{t("pandai_footer_016")}</a></li>
              </ul>
            </div>

            {/* Column 3: Layanan */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-4">
                {t("pandai_footer_017")}</h4>
              <ul className="space-y-2.5 text-sm text-sky-100">
                <li><a href={t("pandai_footer_018")} className="hover:text-white transition-colors">{t("pandai_footer_019")}</a></li>
                <li><a href={t("pandai_footer_020")} className="hover:text-white transition-colors">{t("pandai_footer_021")}</a></li>
                <li><a href={t("pandai_footer_022")} className="hover:text-white transition-colors">{t("pandai_footer_023")}</a></li>
                <li><a href={t("pandai_footer_024")} className="hover:text-white transition-colors">{t("pandai_footer_025")}</a></li>
              </ul>
            </div>

            {/* Column 4: Kontak */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-4">
                {t("pandai_footer_026")}</h4>
              <ul className="space-y-2.5 text-sm text-sky-100">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-200 shrink-0" />
                  <a href={`mailto:${t("contact_email")}`} className="hover:text-white transition-colors">
                    {t("contact_email")}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-200 shrink-0" />
                  <a href={`tel:${t("contact_phone")}`} className="hover:text-white transition-colors">
                    {t("contact_phone")}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-sky-200 shrink-0 mt-0.5" />
                  <span>{t("contact_city")}</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Copyright */}
      <div className="py-6 bg-[#052747] text-xs text-sky-200 border-t border-white/10">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p>{t("copyright_text")}</p>
            <div className="flex gap-4">{[["social_instagram", "Instagram"], ["social_linkedin", "LinkedIn"], ["social_facebook", "Facebook"]].map(([key,label]) => t(key) ? <a key={key} href={t(key)} target="_blank" rel="noopener noreferrer">{label}</a> : null)}</div>
            <p className="text-sky-300 font-medium">{t("pandai_footer_031")}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};
