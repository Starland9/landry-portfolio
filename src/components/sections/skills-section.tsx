"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Server,
  Palette,
} from "lucide-react";
import { BIG_SKILLS } from "@/lib/constants";

export default function SkillsRadar() {
  return (
    <section className="container-safe bg-gradient-to-b from-gray-900 to-black relative z-0 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Compétences
          </h2>
          <p className="text-responsive-lg text-white/70 max-w-2xl mx-auto px-4">
            Mes expertises techniques en développement moderne
          </p>
        </motion.div>

        {/* Circular Layout Container */}
        <div className="relative w-full max-w-7xl mx-auto min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-visible">
          {/* Central Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-2"
          >
            <GlassCard className="p-6 sm:p-8 lg:p-12">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center mb-4 lg:mb-6">
                  Radar des Compétences
                </h3>
                {/* Radar Grid */}
                <svg
                  className="w-full h-full mt-2 lg:mt-4"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid circles */}
                  {[60, 120, 180].map((radius) => (
                    <circle
                      key={radius}
                      cx="200"
                      cy="200"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Grid lines */}
                  {BIG_SKILLS.map((_, index) => {
                    const angle =
                      (index * (360 / BIG_SKILLS.length) - 90) *
                      (Math.PI / 180);
                    const x = 200 + Math.cos(angle) * 180;
                    const y = 200 + Math.sin(angle) * 180;
                    return (
                      <line
                        key={index}
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Filled Radar Area */}
                  <motion.polygon
                    points={BIG_SKILLS.map((skill, index) => {
                      const angle =
                        (index * (360 / BIG_SKILLS.length) - 90) *
                        (Math.PI / 180);
                      const radius = (skill.level / 100) * 180;
                      const x = 200 + Math.cos(angle) * radius;
                      const y = 200 + Math.sin(angle) * radius;
                      return `${x},${y}`;
                    }).join(" ")}
                    fill="url(#radar-fill)"
                    stroke="url(#radar-stroke)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />

                  {/* Skill points */}
                  {BIG_SKILLS.map((skill, index) => {
                    const angle =
                      (index * (360 / BIG_SKILLS.length) - 90) *
                      (Math.PI / 180);
                    const radius = (skill.level / 100) * 180;
                    const x = 200 + Math.cos(angle) * radius;
                    const y = 200 + Math.sin(angle) * radius;

                    return (
                      <motion.circle
                        key={skill.name}
                        cx={x}
                        cy={y}
                        r="8"
                        fill="url(#gradient-cyan-purple)"
                        stroke="white"
                        strokeWidth="3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      />
                    );
                  })}

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient
                      id="gradient-cyan-purple"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient
                      id="radar-fill"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
                      <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
                    </linearGradient>
                    <linearGradient
                      id="radar-stroke"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </GlassCard>
          </motion.div>

          {/* Circular Skills Cards */}
          <div className="absolute inset-0 hidden lg:block">
            {BIG_SKILLS.map((skill, index) => {
              // Calculate position around the central radar
              const angle =
                (index * (360 / BIG_SKILLS.length) - 90) * (Math.PI / 180);
              const radius = 280; // Distance from center - réduit pour éviter le débordement
              const x = 50 + (Math.cos(angle) * radius) / 10; // Convert to percentage
              const y = 50 + (Math.sin(angle) * radius) / 10; // Convert to percentage

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 1.5 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.1, zIndex: 5 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-3"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  <GlassCard
                    className="p-4 hover:shadow-2xl transition-all duration-300 w-48"
                    hover
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}
                      >
                        <skill.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Title and Level */}
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {skill.name}
                        </h3>
                        <span className="text-cyan-400 font-medium text-sm">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            delay: 2 + index * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {skill.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                        {skill.technologies.length > 2 && (
                          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/50">
                            +{skill.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Skills List */}
          <div className="absolute top-full mt-12 w-full lg:hidden">
            <div className="grid sm:grid-cols-2 gap-4 px-4">
              {BIG_SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="p-4" hover>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <skill.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base font-bold text-white truncate">
                            {skill.name}
                          </h3>
                          <span className="text-cyan-400 font-medium text-sm flex-shrink-0 ml-2">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {skill.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                      {skill.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/50">
                          +{skill.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
