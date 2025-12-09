"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles, Filter, Layers } from "lucide-react";

import { FEATURED_PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tous",
  web: "Web",
  mobile: "Mobile",
};

const categories = [
  "all",
  ...Array.from(new Set(FEATURED_PROJECTS.map((project) => project.category))),
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return FEATURED_PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (query.length === 0) {
        return true;
      }

      const haystack = [
        project.title,
        project.headline,
        project.description,
        project.summary,
        project.problem,
        project.solution,
        project.timeline,
        project.status,
        ...project.technologies,
        ...project.features,
        ...project.impact,
        ...project.role,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [activeCategory, search]);

  return (
    <section className="container-safe bg-gradient-to-b from-black via-slate-950 to-black py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Mes projets vedettes
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Une vitrine immersive de mes réalisations les plus ambitieuses
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70">
            Explorez, filtrez et plongez dans les détails de mes produits
            phares. Chaque projet incarne un mélange d'innovation, de rigueur
            technique et d'expérience utilisateur soignée pour résoudre des
            défis réels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <label
                    htmlFor="projects-search"
                    className="text-sm font-medium text-white/70 block mb-2"
                  >
                    Rechercher un projet
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      id="projects-search"
                      type="search"
                      placeholder="Ex : IA, Flutter, optimisation frontend..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="hidden md:flex flex-col gap-2">
                  <span className="text-sm uppercase tracking-widest text-white/50">
                    Statistiques
                  </span>
                  <div className="flex gap-6 text-white/80 text-sm">
                    <div>
                      <span className="block text-3xl font-bold text-white">
                        {FEATURED_PROJECTS.length}
                      </span>
                      Projets vedettes
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-white">
                        {categories.length - 1}
                      </span>
                      Domaines couverts
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-white/60 text-sm font-medium uppercase tracking-[0.2em]">
                  <Filter className="w-4 h-4" />
                  Filtrer par domaine
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm transition-all duration-200",
                        activeCategory === category
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-400/60 text-white shadow-lg shadow-cyan-500/20"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                      )}
                    >
                      {CATEGORY_LABELS[category] ?? category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:hidden grid grid-cols-2 gap-4 text-white/80 text-sm pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <span className="block text-2xl font-bold text-white">
                    {FEATURED_PROJECTS.length}
                  </span>
                  Projets vedettes
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <span className="block text-2xl font-bold text-white">
                    {categories.length - 1}
                  </span>
                  Domaines couverts
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="mt-16">
          {filteredProjects.length === 0 ? (
            <GlassCard className="p-10 text-center">
              <p className="text-white/70 text-lg">
                Aucun projet ne correspond à votre recherche. Essayez un autre
                mot-clé ou explorez une autre catégorie.
              </p>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                >
                  <GlassCard
                    className="overflow-hidden h-full flex flex-col"
                    hover
                  >
                    <div className="flex flex-col h-full p-6">
                      {/* Image */}
                      <div className="relative mb-4 -mx-6 -mt-6">
                        <div className="relative aspect-video overflow-hidden rounded-b-2xl border-b border-white/10">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col gap-4">
                        {/* Title & Category */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                              <Layers className="w-3 h-3 text-cyan-400" />
                              {CATEGORY_LABELS[project.category] ??
                                project.category}
                            </span>
                            <span className="text-xs text-white/50">
                              {project.timeline}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-sm text-white/80">
                            {project.headline}
                          </p>
                        </div>

                        {/* Short summary */}
                        <p className="text-xs text-white/60 line-clamp-2">
                          {project.summary}
                        </p>

                        {/* Key features */}
                        <div className="space-y-2">
                          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                            Capacités clés
                          </span>
                          <ul className="space-y-1">
                            {project.features.slice(0, 2).map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-xs text-white/70"
                              >
                                <Sparkles className="w-3 h-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="space-y-2">
                          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                            Stack
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2 py-1 text-xs text-white/50">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
                        <GlassButton
                          href={`/projects/${project.id}`}
                          variant="secondary"
                          size="sm"
                        >
                          Détail
                        </GlassButton>
                        {project.liveUrl && (
                          <GlassButton href={project.liveUrl} size="sm">
                            En ligne
                          </GlassButton>
                        )}
                        {project.githubUrl && (
                          <GlassButton
                            href={project.githubUrl}
                            variant="outline"
                            size="sm"
                          >
                            Code
                          </GlassButton>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
