"use client";

import { GlassButton } from "@/components/ui/glass-button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icône d'erreur animée */}
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Oups, quelque chose s&apos;est mal passé
        </h1>

        <p className="text-white/60 mb-2">
          Une erreur inattendue est survenue lors du chargement de la page.
        </p>

        {error.digest && (
          <p className="text-white/30 text-sm font-mono mb-8">
            ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlassButton onClick={reset} variant="primary">
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </GlassButton>
          <GlassButton href="/" variant="secondary">
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
