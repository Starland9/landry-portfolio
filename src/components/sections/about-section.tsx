"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

import { useEffect, useState } from "react";
import { GitHubUser } from "@/types/github";
import { EXPERIENCES, PERSONAL_INFO } from "../../lib/constants";
import { TicTacToe } from "@/components/ui/tic-tac-toe";

export default function AboutSection() {
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    fetch("/api/github/user")
      .then((res) => res.json())
      .then(setGithubUser)
      .catch(console.error);
  }, []);

  return (
    <section
      id="about"
      className="container-safe bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-responsive-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
            À Propos
          </h2>
          <p className="text-responsive-lg text-white/70 max-w-2xl mx-auto px-4">
            Passionné par l'innovation technologique et l'excellence dans le
            développement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-8 h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                    S9
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {PERSONAL_INFO.fullName}
                    </h3>
                    <p className="text-cyan-400">Développeur Full-Stack</p>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed">
                  Développeur autodidacte passionné avec plus de 4 ans
                  d'expérience dans la création d'applications web et mobiles
                  performantes. Je me spécialise dans l'écosystème
                  JavaScript/TypeScript, notamment avec Next.js, ainsi qu'en
                  Flutter pour le mobile, Python pour le backend et Godot Engine
                  pour le développement de jeux et d'expériences interactives.
                </p>

                {githubUser && (
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {githubUser.public_repos}
                      </div>
                      <div className="text-sm text-white/60">Repositories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {githubUser.followers}
                      </div>
                      <div className="text-sm text-white/60">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {new Date().getFullYear() -
                          new Date(githubUser.created_at).getFullYear()}
                      </div>
                      <div className="text-sm text-white/60">Années</div>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Interactive TicTacToe */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TicTacToe className="h-full" />
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Expérience
            </h3>
            <div className="space-y-8">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-8 border-l-2 border-gradient-to-b from-cyan-400 to-purple-600"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600" />

                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-xl font-bold text-white">
                        {exp.title}
                      </h4>
                      <span className="text-cyan-400 text-sm">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                    <ul className="space-y-1 text-white/70">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-2">•</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
