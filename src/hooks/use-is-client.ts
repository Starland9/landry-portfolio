"use client";

import { useEffect, useState } from "react";

/**
 * Hook pour détecter si le composant est monté côté client.
 * ⚠️ Préférer `next/dynamic` avec `ssr: false` ou Suspense pour éviter le flash.
 * Utiliser uniquement pour des cas simples où le SSR n'est pas critique.
 *
 * @example
 * ```tsx
 * // ✅ Mieux : utiliser next/dynamic
 * const ClientOnly = dynamic(() => import('./Component'), { ssr: false });
 *
 * // 🟡 Acceptable pour cas simples
 * const isClient = useIsClient();
 * if (!isClient) return <div className="skeleton h-10 w-full" />;
 * ```
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
