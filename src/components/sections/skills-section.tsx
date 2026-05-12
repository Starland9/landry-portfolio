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

        {/* Desktop: Circular Layout Container */}
        <div className="relative w-full max-w-7xl mx-auto min-h-[700px] lg:min-h-[800px] items-center justify-center overflow-visible hidden lg:flex">
          {/* Central Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-2"
          >
            <GlassCard className="p-6 sm:p-8 lg:p-12 overflow-visible">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto overflow-visible">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center mb-4 lg:mb-6">
                  Radar des Compétences
                </h3>
                {/* Radar Grid */}
                <svg
                  className="w-full h-full mt-2 lg:mt-4"
                  viewBox="0 0 500 500"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ overflow: "visible" }}
                >
                  {/* Grid circles */}
                  {[60, 120, 180].map((radius) => (
                    <circle
                      key={radius}
                      cx="250"
                      cy="250"
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
                    const x = 250 + Math.cos(angle) * 180;
                    const y = 250 + Math.sin(angle) * 180;
                    return (
                      <line
                        key={index}
                        x1="250"
                        y1="250"
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
                      const x = 250 + Math.cos(angle) * radius;
                      const y = 250 + Math.sin(angle) * radius;
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
                    const x = 250 + Math.cos(angle) * radius;
                    const y = 250 + Math.sin(angle) * radius;

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

                  {/* Skill Labels - Style Chip Glassmorphism */}
                  {BIG_SKILLS.map((skill, index) => {
                    const angle =
                      (index * (360 / BIG_SKILLS.length) - 90) *
                      (Math.PI / 180);
                    const labelRadius = 220; // Plus loin pour accommoder les chips
                    const x = 250 + Math.cos(angle) * labelRadius;
                    const y = 250 + Math.sin(angle) * labelRadius;

                    return (
                      <motion.foreignObject
                        key={`${skill.name}-label`}
                        x={x - 50} // Centré sur la position
                        y={y - 14} // Centré verticalement
                        width="100"
                        height="28"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-center w-full h-full">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${skill.color} bg-opacity-20 backdrop-blur-xl border border-white/30 rounded-full shadow-lg`}
                          >
                            <skill.icon className="w-4 h-4 text-white flex-shrink-0" />
                            <span className="text-white text-xs font-semibold truncate">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      </motion.foreignObject>
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
              const radius = 350; // Distance from center - augmenté pour plus d'espacement
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
        </div>

        {/* Mobile Skills Grid - Clean Implementation */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
            {BIG_SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <GlassCard className="p-6 h-full" hover>
                  <div className="text-center space-y-4">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center mx-auto shadow-lg`}
                    >
                      <skill.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title and Level */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {skill.name}
                      </h3>
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-cyan-400">
                          {skill.level}%
                        </span>
                        <div className="flex-1 max-w-24 bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              delay: 0.3 + index * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {skill.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {skill.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/30 rounded-full text-xs text-cyan-400 font-medium">
                          +{skill.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
