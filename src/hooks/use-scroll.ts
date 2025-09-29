"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id,
              offsetTop: rect.top + window.scrollY,
              offsetBottom: rect.bottom + window.scrollY,
            };
          }
          return null;
        })
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find((section) => {
        return (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetBottom
        );
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
}

export function useScrollToSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return scrollToSection;
}
