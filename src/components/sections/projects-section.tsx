"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Github, ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { GitHubRepo } from "@/types/github";
import { formatDate } from "@/lib/utils";
import { FEATURED_PROJECTS } from "@/lib/constants";
import Image from "next/image";

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const technologies = [
    "all",
    "Dart",
    "JavaScript",
    "TypeScript",
    "Python",
    "HTML",
    "CSS",
    "Java",
    "GDScript",
  ];

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  const filteredRepos = repos
    .filter((repo) => filter === "all" || repo.language === filter)
    .slice(0, 6);

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "from-yellow-400 to-yellow-600",
      TypeScript: "from-blue-400 to-blue-600",
      Python: "from-green-400 to-green-600",
      Java: "from-red-400 to-red-600",
      HTML: "from-orange-400 to-orange-600",
      CSS: "from-purple-400 to-purple-600",
      Dart: "from-blue-300 to-blue-500",
      GDScript: "from-gray-400 to-gray-600",
    };
    return colors[language || ""] || "from-gray-400 to-gray-600";
  };

  const flagshipProject =
    FEATURED_PROJECTS.find((project) => project.id === "fais-mon-cv") ||
    FEATURED_PROJECTS[0];

  return (
    <section
      id="projects"
      className="container-safe bg-gradient-to-b from-gray-900 to-black relative z-10"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-responsive-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Projets
          </h2>
          <p className="text-responsive-lg text-white/70 max-w-2xl mx-auto px-4">
            Découvrez mes créations les plus récentes et innovantes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-12"
        >
          <GlassButton href="/projects" size="lg">
            Explorer tous mes projets vedettes
          </GlassButton>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                filter === tech
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-400/50 text-cyan-400"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              {tech === "all" ? "Tous" : tech}
            </button>
          ))}
        </motion.div>

        {flagshipProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-16"
          >
            <GlassCard className="overflow-hidden">
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 p-6 sm:p-10 items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                  <Image
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
                      Projet vedette
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
                      Étude de cas détaillée
                    </GlassButton>
                    {flagshipProject.liveUrl && (
                      <GlassButton
                        href={flagshipProject.liveUrl}
                        variant="secondary"
                      >
                        Découvrir en ligne
                      </GlassButton>
                    )}
                    {flagshipProject.githubUrl && (
                      <GlassButton
                        href={flagshipProject.githubUrl}
                        variant="outline"
                      >
                        Voir le code
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

        {/* GitHub Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassCard key={i} className="p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3"></div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -10 }}
              >
                <GlassCard className="p-6 h-full" hover>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-white truncate pr-2">
                        {repo.name}
                      </h3>
                      <div className="flex gap-2 text-white/60">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm line-clamp-3 min-h-[60px]">
                      {repo.description || "Aucune description disponible"}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>

                    {/* Language & Topics */}
                    <div className="space-y-2">
                      {repo.language && (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`}
                          />
                          <span className="text-white/80 text-sm">
                            {repo.language}
                          </span>
                        </div>
                      )}

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {repo.topics.slice(0, 3).map((topic) => (
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
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <GlassButton
            variant="outline"
            size="lg"
            onClick={() =>
              window.open("https://github.com/Starland9", "_blank")
            }
          >
            <Github className="w-5 h-5" />
            Voir tous mes projets sur GitHub
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );
}
