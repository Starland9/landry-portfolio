"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Star, Calendar } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { ProjectImage } from "@/components/ui/project-image";

export default function ProjectsSection() {
  const [filter, setFilter] = useState<string>("all");

  const technologies = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(
          FEATURED_PROJECTS.flatMap((project) =>
            project.technologies.map((technology) =>
              technology.replace(/\s+\d+.*$/, ""),
            ),
          ),
        ),
      ),
    ],
    [],
  );

  const filteredProjects = FEATURED_PROJECTS.filter(
    (project) =>
      filter === "all" ||
      project.technologies.some((technology) =>
        technology.toLowerCase().includes(filter.toLowerCase()),
      ),
  ).slice(0, 6);

  // Use G-Buy as the flagship project
  const flagshipProject =
    FEATURED_PROJECTS.find((project) => project.id === "g-buy-web") ||
    FEATURED_PROJECTS[0];

  return (
    <section
      id="projects"
      className="container-safe bg-linear-to-b from-slate-900 via-slate-950 to-black relative z-10 py-20"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/20 text-sm text-white/70 mb-6"
          >
            <Star className="w-4 h-4 text-cyan-400" />
            Portfolio
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Projects
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto px-4">
            Production applications shipped across web and mobile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <GlassButton
            href="/projects"
            size="lg"
            className="shadow-lg shadow-cyan-500/20"
          >
            View all projects
          </GlassButton>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {technologies.map((tech, index) => (
            <motion.button
              key={tech}
              onClick={() => setFilter(tech)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.03 }}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                filter === tech
                  ? "bg-linear-to-r from-cyan-500/20 to-purple-600/20 border-cyan-400/50 text-white shadow-lg shadow-cyan-500/10 scale-105"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 hover:border-white/20"
              }`}
            >
              {tech === "all" ? "All" : tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Flagship project spotlight */}
        {flagshipProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <GlassCard className="overflow-hidden">
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 p-6 sm:p-10 items-center">
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/10">
                  <ProjectImage
                    src={flagshipProject.image}
                    alt={flagshipProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.3em] text-white/60">
                      Featured project
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                      {flagshipProject.title}
                    </h3>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                      {flagshipProject.headline ?? flagshipProject.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <GlassButton href={`/projects/${flagshipProject.id}`}>
                      Case study
                    </GlassButton>
                    {flagshipProject.liveUrl && (
                      <GlassButton
                        href={flagshipProject.liveUrl}
                        variant="secondary"
                      >
                        Live site
                      </GlassButton>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    {flagshipProject.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Constant projects grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/40 text-lg">
              No projects found for filter{" "}
              <span className="text-cyan-400">{filter}</span>.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="mt-3 text-cyan-400 hover:underline text-sm"
            >
              Reset filter
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <GlassCard className="group p-6 h-full" hover>
                    <div className="space-y-4">
                      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <ProjectImage
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-white truncate pr-2">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-white/70 text-sm line-clamp-3 min-h-15">
                        {project.headline ??
                          project.summary ??
                          project.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{project.status}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {project.technologies[0] && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-600" />
                            <span className="text-white/80 text-sm">
                              {project.technologies[0]}
                            </span>
                          </div>
                        )}

                        {project.technologies.length > 1 && (
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(1, 4).map((topic) => (
                              <span
                                key={topic}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
