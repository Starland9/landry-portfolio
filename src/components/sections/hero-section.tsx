"use client";

import { motion } from "framer-motion";
import { TypeWriter } from "@/components/ui/typewriter";
import { FloatingParticles } from "@/components/animations/floating-particles";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Github, ExternalLink, Mail, ChevronDown } from "lucide-react";
import { PERSONAL_INFO, TECH_STACK } from "../../lib/constants";

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <FloatingParticles />

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 z-10">
        <GlassCard className="max-w-4xl mx-auto p-12 text-center" hover>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Avatar */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8"
              whileHover={{ scale: 1.1, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  LS
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/50 to-purple-600/50 blur-xl animate-pulse" />
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
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
              <p className="text-lg text-white/70 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <GlassButton
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
              >
                <ExternalLink className="w-5 h-5" />
                Voir mes projets
              </GlassButton>

              <GlassButton
                variant="outline"
                size="lg"
                onClick={scrollToContact}
              >
                <Mail className="w-5 h-5" />
                Me contacter
              </GlassButton>

              <motion.a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            </motion.div>

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
