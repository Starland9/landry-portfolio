"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/layout/footer";
import { ArrowLeft } from "lucide-react";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <div className="container-safe fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <button
            onClick={handleBack}
            aria-label="Retour"
            title="Retour"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {children}

      <Footer />
    </>
  );
}
