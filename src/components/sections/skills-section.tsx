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
    <section className="container-safe bg-gradient-to-b from-gray-900 to-black">
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

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1 lg:col-span-3"
          >
            <GlassCard className="p-6 sm:p-8 lg:p-12">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] mx-auto max-w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
                  Radar des Compétences
                </h3>
                {/* Radar Grid */}
                <svg
                  className="w-full h-full mt-4"
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

                {/* Skill labels */}
                <div className="absolute inset-0">
                  {BIG_SKILLS.map((skill, index) => {
                    const angle =
                      (index * (360 / BIG_SKILLS.length) - 90) *
                      (Math.PI / 180);
                    const labelRadius = 220; // Fixed radius for labels
                    const x = 200 + Math.cos(angle) * labelRadius;
                    const y = 200 + Math.sin(angle) * labelRadius;

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                        className="absolute flex items-center gap-2 text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20"
                        style={{
                          left: x,
                          top: y,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <skill.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="whitespace-nowrap text-xs sm:text-sm">
                          {skill.name}
                        </span>
                        <span className="text-cyan-400 font-bold text-xs">
                          {skill.level}%
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Skills List */}
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2 lg:col-span-2">
            {BIG_SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-3 sm:p-4" hover>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-white truncate">
                          {skill.name}
                        </h3>
                        <span className="text-cyan-400 font-medium text-xs sm:text-sm flex-shrink-0 ml-2">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
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
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-full text-xs text-white/70 whitespace-nowrap"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {skill.technologies.length > 3 && (
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/50">
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
    </section>
  );
}
