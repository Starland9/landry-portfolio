"use client";

import { motion } from "framer-motion";
import { TypeWriter } from "@/components/ui/typewriter";
import { FloatingParticles } from "@/components/animations/floating-particles";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { ChevronDown, Code2, Sparkles } from "lucide-react";
import { PERSONAL_INFO, TECH_STACK } from "../../lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black w-full">
      <FloatingParticles />

      {/* Enhanced background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-[500px] lg:h-[500px] bg-cyan-500/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-[400px] lg:h-[400px] bg-purple-600/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-64 lg:h-64 bg-pink-500/10 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="container-safe z-10 w-full max-w-full py-8">
        <GlassCard
          className="w-full max-w-4xl mx-auto p-6 sm:p-8 lg:p-14 text-center border-white/10"
          hover
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/20 text-sm text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Disponible pour de nouveaux projets
              </span>
            </motion.div>

            {/* Avatar with enhanced glow */}
            <motion.div
              className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto"
              whileHover={{ scale: 1.1, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1 shadow-2xl shadow-cyan-500/30">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    LS
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/40 to-purple-600/40 blur-2xl animate-pulse" />
              {/* Decorative sparkles */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </motion.div>
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
                <p className="text-2xl md:text-3xl text-white/70 font-light flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-cyan-400 hidden sm:block" />
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
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed px-4">
                Créateur d'expériences numériques exceptionnelles, 
                architecte de solutions innovantes qui allient 
                <span className="text-cyan-400"> performance</span>, 
                <span className="text-purple-400"> esthétique</span> et 
                <span className="text-pink-400"> innovation</span>.
              </p>
            </motion.div>

            {/* CTA Buttons with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            >
              <GlassButton
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300"
              >
                ✨ Collaborons ensemble
              </GlassButton>
              <GlassButton
                href="/projects"
                variant="secondary"
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Voir mes projets →
              </GlassButton>
            </motion.div>

            {/* Tech stack preview with better animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7, duration: 1 }}
              className="pt-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Stack technique</p>
              <div className="flex flex-wrap justify-center gap-3">
                {TECH_STACK.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 7.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </GlassCard>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 cursor-pointer hover:text-cyan-400 transition-colors p-2"
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
