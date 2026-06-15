"use client";

/**
 * Lien d'évitement pour la navigation clavier (WCAG 2.4.1 Bypass Blocks).
 * Permet aux utilisateurs de sauter directement au contenu principal.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-3 focus:bg-cyan-500 focus:text-black focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none"
    >
      Aller au contenu principal
    </a>
  );
}
