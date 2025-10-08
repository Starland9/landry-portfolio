import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { FEATURED_PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Layers,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

type ProjectParams = {
  id: string;
};

type ParamsInput = ProjectParams | Promise<ProjectParams>;

function getProject(id: string) {
  return FEATURED_PROJECTS.find((project) => project.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: ParamsInput;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return {
      title: "Projet introuvable | Landry Simo",
    };
  }

  return {
    title: `${project.title} · Landry Simo`,
    description: project.headline ?? project.summary ?? project.description,
    openGraph: {
      title: `${project.title} · Landry Simo`,
      description: project.headline ?? project.summary ?? project.description,
      images: project.image
        ? [
            {
              url: project.image,
              alt: project.title,
            },
          ]
        : undefined,
    },
  };
}

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ id: project.id }));
}

const CATEGORY_LABELS: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: ParamsInput;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = FEATURED_PROJECTS.filter(
    (item) => item.id !== project.id
  ).slice(0, 3);

  return (
    <section className="container-safe bg-gradient-to-b from-black via-slate-950 to-black py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets vedettes
          </Link>
        </div>

        <GlassCard className="overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 p-6 sm:p-10">
            <div className="space-y-6">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 left-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-sm text-white/80 backdrop-blur">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    {CATEGORY_LABELS[project.category] ?? project.category}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-sm text-white/80 backdrop-blur">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    {project.timeline}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 text-sm text-white/80 backdrop-blur">
                    <Gauge className="w-4 h-4 text-emerald-400" />
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="pt-12 space-y-6">
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                    {project.title}
                  </h1>
                  <p className="text-lg text-white/80">{project.headline}</p>
                  <p className="text-base text-white/70 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <GlassButton href={project.liveUrl}>
                    Découvrir le produit
                  </GlassButton>
                  {project.githubUrl && (
                    <GlassButton href={project.githubUrl} variant="outline">
                      Code source
                    </GlassButton>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <GlassCard className="p-6 bg-black/40 border-white/10">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">
                      Le défi
                    </h2>
                    <p className="mt-3 text-white/75 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">
                      La réponse produit
                    </h2>
                    <p className="mt-3 text-white/75 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Impact mesurable
                </h2>
                <ul className="mt-4 grid gap-3">
                  {project.impact.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <Sparkles className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">
                      Mon rôle
                    </h2>
                    <ul className="mt-4 grid gap-3 text-sm text-white/80">
                      {project.role.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Workflow className="w-4 h-4 mt-0.5 text-purple-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">
                      Stack & organisation
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="text-sm text-white/75">
                        <span className="block text-white/40 text-xs uppercase tracking-[0.3em] mb-1">
                          Stack technique
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-white/75">
                        <span className="block text-white/40 text-xs uppercase tracking-[0.3em] mb-1">
                          Équipe & gouvernance
                        </span>
                        <div className="flex items-center gap-2 text-white/70">
                          <Users className="w-4 h-4 text-emerald-400" />
                          {project.team}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </GlassCard>

        {project.features.length > 0 && (
          <div className="mt-16">
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">
              Capacités produit détaillées
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature) => (
                <GlassCard key={feature} className="p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <p className="text-sm text-white/80 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {relatedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">
              Autres projets vedettes
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map((item) => (
                <GlassCard key={item.id} className="p-6 h-full" hover>
                  <div className="space-y-4">
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-3">
                        {item.headline}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <GlassButton
                      href={`/projects/${item.id}`}
                      variant="secondary"
                    >
                      Explorer
                    </GlassButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
