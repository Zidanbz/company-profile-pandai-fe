"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React, { useState } from "react";
import { Container } from "@/components/base/Container";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FaqSection: React.FC = () => {
  const t = useSiteText();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white dark:bg-slate-950 relative">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-100 dark:border-slate-800">
              {t("pandai_faq_001")}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              {t("pandai_faq_002")}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              {t("pandai_faq_003")}
            </p>

            <div className="pt-2">
              <a
                href={t("pandai_faq_004")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#f97316] hover:bg-[#ea580c] shadow-md shadow-[#f97316]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("pandai_faq_005")}
              </a>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {[
              {
                question: "Layanan apa saja yang disediakan Pandai?",
                answer:
                  "Konsultasi IT, konektivitas Localoop & Metro-E melalui fiber optik, pengelolaan data center, penyediaan VPS dan layanan cloud, serta pengembangan perangkat lunak.",
              },
              {
                question: "Bagaimana cara memulai kerja sama?",
                answer:
                  "Anda dapat menghubungi tim kami melalui formulir kontak atau tombol 'Jadwalkan Konsultasi'. Tim representatif kami akan segera menghubungi Anda untuk diskusi teknis dan penawaran spesifik.",
              },
              {
                question: "Di mana lokasi kantor dan jam operasionalnya?",
                answer: `Kantor operasional kami beralamat di ${t("contact_address")}. Jam kerja kami adalah Senin - Jumat, ${t("contact_hours")} WITA.`,
              },
              {
                question: "Di mana saya bisa memesan layanan VPS dan cloud?",
                answer:
                  "Pemesanan layanan cloud and VPS dapat langsung melalui integrasi Pandai Cloud Service atau menghubungi kontak sales & support kami.",
              },
            ].map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-sky-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#f97316] text-white"
                          : "bg-sky-50 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400"
                      }`}
                    >
                      {isOpen ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-50 dark:border-slate-800">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
