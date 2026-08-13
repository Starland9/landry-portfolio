"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SKILL_CATEGORIES } from "@/lib/constants";

export default function SkillsSection() {
  return (
    <section className="container-safe bg-gradient-to-b from-gray-900 to-black relative z-0 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Skills
          </h2>
          <p className="text-responsive-lg text-white/70 max-w-2xl mx-auto px-4">
            Technologies I work with across web, mobile, and backend
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <GlassCard className="p-6 h-full" hover>
                <div className="space-y-4">
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-md`}
                    >
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>

                  {/* Technology chips */}
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-medium hover:border-white/20 hover:text-white/90 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
