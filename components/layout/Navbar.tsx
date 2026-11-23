"use client";

import { useSiteText } from "@/components/content/SiteContentProvider";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const t = useSiteText();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("tentang");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = [
          { id: "tentang", el: document.getElementById("tentang") },
          { id: "layanan", el: document.getElementById("layanan") },
          { id: "proses", el: document.getElementById("proses") },
          { id: "mitra", el: document.getElementById("mitra") },
          { id: "blog", el: document.getElementById("blog") },
        ];

        const scrollPosition = window.scrollY + 200;
        for (const section of sections) {
          if (section.el) {
            const top = section.el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(section.id);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { label: t("pandai_navigation_001"), href: "/#tentang", id: "tentang" },
    { label: t("pandai_navigation_002"), href: "/#layanan", id: "layanan" },
    { label: t("pandai_navigation_003"), href: "/#proses", id: "proses" },
    { label: t("pandai_navigation_004"), href: "/#mitra", id: "mitra" },
    { label: t("pandai_navigation_005"), href: "/#blog", id: "blog" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const navOffset = 100;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveSection(id);
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={cn(
          "max-w-6xl mx-auto rounded-full transition-all duration-300 pointer-events-auto",
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-sky-100 dark:border-slate-700 shadow-[0_10px_30px_-5px_rgba(0,119,200,0.12)] py-2.5 px-6"
            : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/80 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3 px-6 sm:px-8"
        )}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Logo Pandai */}
          <Link href="/" className="flex h-10 -translate-y-0.5 items-center group" aria-label={t("pandai_navigation_006")}>
            <img
              src={t("site_logo")}
              alt={t("pandai_navigation_008")}
              className="block h-8 w-auto object-contain transition-transform group-hover:scale-[1.03]"
            />
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#0066ad] dark:hover:text-sky-300",
                  activeSection === link.id
                    ? "text-[#0066ad] dark:text-sky-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-3 justify-self-end">
            <ThemeToggle />
            <a
              href={t("pandai_navigation_009")}
              onClick={(e) => handleNavClick(e, "/#kontak", "kontak")}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold text-white bg-[#0077c8] hover:bg-[#0284c7] shadow-sm shadow-[#0077c8]/25 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("pandai_navigation_010")}</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 justify-self-end col-start-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={t("pandai_navigation_011")}
              aria-expanded={mobileMenuOpen}
              aria-controls="public-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="public-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 max-w-6xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-sky-100 dark:border-slate-700 rounded-3xl p-5 shadow-xl pointer-events-auto"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href, link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:text-[#0077c8] dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <a
                  href={t("pandai_navigation_012")}
                  onClick={(e) => {
                    handleNavClick(e, "/#kontak", "kontak");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0077c8] hover:bg-[#0284c7] transition-colors"
                >
                  {t("pandai_navigation_013")}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
