"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { X } from "lucide-react";
import { AdminHeader } from "@/components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [authorized, setAuthorized] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) menuRef.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem("globallink_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        Memverifikasi sesi admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      <dialog
        ref={menuRef}
        aria-label="Menu admin"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (
            event.target === event.currentTarget ||
            (event.target as Element).closest("a")
          )
            menuRef.current?.close();
        }}
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-64 max-w-[85vw] overflow-y-auto border-0 bg-white p-0 text-slate-900 backdrop:bg-slate-950/50 dark:bg-slate-900 dark:text-slate-100"
      >
        <button
          type="button"
          aria-label="Tutup menu admin"
          onClick={() => menuRef.current?.close()}
          className="absolute right-3 top-3 z-30 rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>
        {menuOpen && <AdminSidebar />}
      </dialog>
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onOpenMenu={() => {
            setMenuOpen(true);
            menuRef.current?.showModal();
          }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
