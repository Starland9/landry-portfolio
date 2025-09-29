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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <GlassCard className="p-4 sm:p-6 lg:p-8">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto max-w-full">
                {/* Radar Grid */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 320 320"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid circles */}
                  {[60, 120, 180].map((radius) => (
                    <circle
                      key={radius}
                      cx="160"
                      cy="160"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Grid lines */}
                  {BIG_SKILLS.map((_, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180);
                    const x = 160 + Math.cos(angle) * 180;
                    const y = 160 + Math.sin(angle) * 180;
                    return (
                      <line
                        key={index}
                        x1="160"
                        y1="160"
                        x2={x}
                        y2={y}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Skill points */}
                  {BIG_SKILLS.map((skill, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180);
                    const radius = (skill.level / 100) * 180;
                    const x = 160 + Math.cos(angle) * radius;
                    const y = 160 + Math.sin(angle) * radius;

                    return (
                      <motion.circle
                        key={skill.name}
                        cx={x}
                        cy={y}
                        r="6"
                        fill="url(#gradient-cyan-purple)"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
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
                  </defs>
                </svg>

                {/* Skill labels */}
                {BIG_SKILLS.map((skill, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const x = 160 + Math.cos(angle) * 200; // Reduced from 220 to prevent overflow
                  const y = 160 + Math.sin(angle) * 200;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="absolute flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm font-medium max-w-20 sm:max-w-none"
                      style={{
                        left: x - 40,
                        top: y - 12,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <skill.icon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                      <span className="truncate sm:whitespace-normal">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* Skills List */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {BIG_SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-4 sm:p-6" hover>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                          {skill.name}
                        </h3>
                        <span className="text-cyan-400 font-medium text-sm sm:text-base flex-shrink-0 ml-2">
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

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skill.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/70 whitespace-nowrap"
                      >
                        {tech}
                      </motion.span>
                    ))}
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
