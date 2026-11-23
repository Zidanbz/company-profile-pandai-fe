import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingChat } from "@/components/chat/FloatingChat";

import { getSiteContent } from "@/lib/content/server";
import { SiteContentProvider } from "@/components/content/SiteContentProvider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();
  return (
    <SiteContentProvider content={content}>
    <div className="min-h-screen flex flex-col justify-between relative">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingChat />
    </div>
    </SiteContentProvider>
  );
}
