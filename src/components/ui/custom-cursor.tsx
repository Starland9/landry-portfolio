"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Désactiver sur mobile (écran tactile)
    const isTouchDevice =
      "ontouchstart" in window ||
      window.matchMedia("(pointer: coarse)").matches;

    // Désactiver si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouchDevice || prefersReducedMotion) {
      document.body.classList.remove("custom-cursor");
      return;
    }

    setIsEnabled(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-user");
    }
  }, []);

  const handleMouseDownGlobal = useCallback(() => {
    document.body.classList.remove("keyboard-user");
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDownGlobal);

    // Hover detection via event delegation (perf optimisée)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a, button, [role='button']")
      ) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a, button, [role='button']")
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDownGlobal);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isEnabled, handleKeyDown, handleMouseDownGlobal]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mix-blend-difference pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{ scale: isClicking ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        aria-hidden="true"
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-cyan-400/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />
    </>
  );
}
