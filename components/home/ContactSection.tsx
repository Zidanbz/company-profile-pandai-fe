"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React, { useState } from "react";
import { contactApi } from "@/lib/api/contact";
import { Container } from "@/components/base/Container";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const t = useSiteText();
  // Keep the iframe host fixed; CMS content is an encoded address, never arbitrary embed HTML.
  const mapQuery = new URLSearchParams({
    q: t("contact_address"),
    t: "k",
    z: "17",
    hl: "id",
    output: "embed",
  });
  const satelliteMapUrl = `https://maps.google.com/maps?${mapQuery.toString()}`;
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await contactApi.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.service || "Konsultasi Pandai",
        message: [
          formData.company.trim()
            ? `Perusahaan: ${formData.company.trim()}`
            : "",
          formData.message.trim(),
        ]
          .filter(Boolean)
          .join("\n\n"),
      });
      setIsSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Pesan gagal dikirim. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontak"
      className="py-20 md:py-28 bg-white relative scroll-mt-28"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Map Card */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-block px-3.5 py-1 rounded-full bg-white text-[#0077c8] text-xs font-bold uppercase tracking-wider border border-sky-100 shadow-sm">
                {t("pandai_contact_001")}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {t("pandai_contact_002")}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {t("pandai_contact_003")}
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/90 p-5 rounded-2xl border border-sky-100/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t("pandai_contact_004")}
                </span>
                <p className="text-sm font-bold text-[#0077c8]">
                  {t("contact_email")}
                </p>
              </div>

              <div className="bg-white/90 p-5 rounded-2xl border border-sky-100/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t("pandai_contact_006")}
                </span>
                <p className="text-sm font-bold text-[#0077c8]">
                  {t("contact_phone")}
                </p>
              </div>

              <div className="bg-white/90 p-5 rounded-2xl border border-sky-100/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t("pandai_contact_008")}
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {t("contact_hours")}
                </p>
              </div>

              <div className="bg-white/90 p-5 rounded-2xl border border-sky-100/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t("pandai_contact_010")}
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {t("contact_city")}
                </p>
              </div>
            </div>

            {/* Office address & satellite map */}
            <div className="bg-white/90 p-6 rounded-3xl border border-sky-100/80 shadow-sm space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t("pandai_contact_012")}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {t("contact_address")}
              </p>
              <a
                href={t("contact_maps_url")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077c8] hover:text-[#0284c7]"
              >
                {t("pandai_contact_015")}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2 text-xs">
                  <span className="font-semibold text-slate-700">
                    {t("pandai_contact_016")}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                    Satelit
                  </span>
                </div>
                <iframe
                  title={`Peta satelit kantor Pandai — ${t("contact_address")}`}
                  src={satelliteMapUrl}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="block h-64 w-full border-0 sm:h-72"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-7 border border-white/70 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)] text-slate-900">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {t("pandai_contact_017")}
            </h3>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">
                  {t("pandai_contact_018")}
                </h4>
                <p className="text-xs text-emerald-700">
                  {t("pandai_contact_019")}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-3 text-xs font-semibold text-[#0077c8] underline"
                >
                  {t("pandai_contact_020")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <p role="alert" className="text-sm text-red-600">
                    {submitError}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      {t("pandai_contact_021")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t("pandai_contact_022")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077c8]/30 focus:border-[#0077c8] bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      {t("pandai_contact_023")}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder={t("pandai_contact_024")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077c8]/30 focus:border-[#0077c8] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t("pandai_contact_025")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t("pandai_contact_026")}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077c8]/30 focus:border-[#0077c8] bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t("pandai_contact_027")}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077c8]/30 focus:border-[#0077c8] bg-slate-50/50"
                  >
                    <option value="">{t("pandai_contact_028")}</option>
                    {[
                      t("pandai_contact_029"),
                      t("pandai_contact_030"),
                      t("pandai_contact_031"),
                      t("pandai_contact_032"),
                      t("pandai_contact_033"),
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t("pandai_contact_034")}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("pandai_contact_035")}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077c8]/30 focus:border-[#0077c8] bg-slate-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#f97316] hover:bg-[#ea580c] shadow-lg shadow-[#f97316]/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
