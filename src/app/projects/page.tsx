"use client";

import { useMemo, useState } from "react";
import { ProjectImage } from "@/components/ui/project-image";
import { motion } from "framer-motion";
import { Search, Filter, Layers } from "lucide-react";

import { FEATURED_PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  web: "Web",
  mobile: "Mobile",
  Bot: "Bot",
};

const categories = [
  "all",
  ...Array.from(new Set(FEATURED_PROJECTS.map((project) => project.category))),
];

const featuredProjects = FEATURED_PROJECTS.filter((p) => p.featured);
const otherProjects = FEATURED_PROJECTS.filter((p) => !p.featured);

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const matchesFilters = (project: (typeof FEATURED_PROJECTS)[number]) => {
    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;
    if (!matchesCategory) return false;

    const query = search.trim().toLowerCase();
    if (query.length === 0) return true;

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
  };

  const filteredFeatured = useMemo(
    () => featuredProjects.filter(matchesFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCategory, search],
  );

  const filteredOther = useMemo(
    () => otherProjects.filter(matchesFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCategory, search],
  );

  const totalVisible = filteredFeatured.length + filteredOther.length;

  return (
    <section className="container-safe bg-gradient-to-b from-black via-slate-950 to-black py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Projects
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Production applications shipped across web and mobile — each one a
            real engineering decision.
          </p>
        </motion.div>

        {/* Search and filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 mb-16"
        >
          <GlassCard className="p-6 md:p-8 border-white/10">
            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-3 gap-6 items-end">
                <div className="md:col-span-2">
                  <label
                    htmlFor="projects-search"
                    className="text-sm font-medium text-white/60 block mb-3 uppercase tracking-wider"
                  >
                    Search projects
                  </label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      id="projects-search"
                      type="search"
                      placeholder="Flutter, Django, Next.js, Python..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/30 transition-all duration-300 hover:border-white/20"
                    />
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-400/20">
                    <span className="block text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                      {totalVisible}
                    </span>
                    <span className="text-xs text-white/50 uppercase tracking-wider">
                      Projects
                    </span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-400/20">
                    <span className="block text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {categories.length - 1}
                    </span>
                    <span className="text-xs text-white/50 uppercase tracking-wider">
                      Categories
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-[0.2em]">
                  <Filter className="w-4 h-4" />
                  Filter
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.04 }}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300",
                        activeCategory === category
                          ? "bg-gradient-to-r from-cyan-500/30 to-purple-600/30 border-cyan-400/50 text-white shadow-lg shadow-cyan-500/20 scale-105"
                          : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 hover:border-white/20",
                      )}
                    >
                      {CATEGORY_LABELS[category] ?? category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {totalVisible === 0 ? (
          <GlassCard className="p-10 text-center">
            <p className="text-white/70 text-lg">
              No projects match your search. Try a different keyword or
              category.
            </p>
          </GlassCard>
        ) : (
          <>
            {/* Featured projects */}
            {filteredFeatured.length > 0 && (
              <div className="mb-16">
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
                  Featured projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredFeatured.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      featured
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other projects */}
            {filteredOther.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
                  Other projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOther.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      featured={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
  featured: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group"
    >
      <GlassCard
        className="overflow-hidden h-full flex flex-col relative"
        hover
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl`}
        />

        <div className="flex flex-col h-full p-5">
          {/* Image */}
          <div className="relative mb-4 -mx-5 -mt-5">
            <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
              <ProjectImage
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md bg-gradient-to-r ${project.color} text-white shadow-lg`}
                >
                  {project.status === "In production" || project.status === "Live on Play Store" || project.status === "Available on Play Store"
                    ? "Live"
                    : project.status}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-white/80 uppercase tracking-wider">
                <Layers className="w-3 h-3 text-cyan-400" />
                {CATEGORY_LABELS[project.category] ?? project.category}
              </span>
              <span className="text-[10px] text-white/50 font-medium">
                {project.timeline}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>

            <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
              {project.headline}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-[10px] text-white/60 font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-0.5 text-[10px] text-white/40">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
            <GlassButton
              href={`/projects/${project.id}`}
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              Details
            </GlassButton>
            {project.liveUrl && (
              <GlassButton
                href={project.liveUrl}
                size="sm"
                className="flex-1"
              >
                View
              </GlassButton>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
