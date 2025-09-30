"use client";

import { motion } from "framer-motion";
import { TypeWriter } from "@/components/ui/typewriter";
import { FloatingParticles } from "@/components/animations/floating-particles";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { ChevronDown } from "lucide-react";
import { PERSONAL_INFO, TECH_STACK } from "../../lib/constants";

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black w-full">
      <FloatingParticles />

      {/* Background gradient orbs - responsive positioning */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container-safe z-10 w-full max-w-full">
        <GlassCard
          className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-12 text-center"
          hover
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Avatar */}
            <motion.div
              className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8"
              whileHover={{ scale: 1.1, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-white">
                  LS
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/50 to-purple-600/50 blur-xl animate-pulse" />
            </motion.div>
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-responsive-hero font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight break-words">
                <TypeWriter
                  text={PERSONAL_INFO.fullName}
                  delay={500}
                  speed={150}
                />
              </h1>

              <div className="h-16 flex items-center justify-center">
                <p className="text-2xl md:text-3xl text-white/80 font-light">
                  <TypeWriter
                    text={PERSONAL_INFO.title}
                    delay={2500}
                    speed={80}
                  />
                </p>
              </div>
            </div>
            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6, duration: 1 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-responsive-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                Développeur Full-Stack passionné, créateur d'expériences
                numériques exceptionnelles et architecte de solutions
                innovantes.
              </p>
            </motion.div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <GlassButton
                href="#contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 min-w-0"
              >
                Collaborons ensemble
              </GlassButton>
              <GlassButton
                href="#projets"
                variant="secondary"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold min-w-0"
              >
                Voir mes projets
              </GlassButton>
            </div>{" "}
            {/* Tech stack preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8, duration: 1 }}
              className="pt-8"
            >
              <div className="flex flex-wrap justify-center gap-3 text-sm text-white/60">
                {TECH_STACK.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 8.5 + index * 0.1 }}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </GlassCard>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 9, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 cursor-pointer hover:text-white transition-colors"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
