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
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-responsive-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
            About
          </h2>
          <p className="text-responsive-lg text-white/70 max-w-2xl mx-auto px-4">
            Building production software across web and mobile
          </p>
        </motion.div>

        {/* Bio card — full width at top */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <div className="flex items-start gap-6 flex-col sm:flex-row">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                LS
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {PERSONAL_INFO.fullName}
                  </h3>
                  <p className="text-cyan-400">{PERSONAL_INFO.title}</p>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
                {githubUser && (
                  <div className="flex flex-wrap gap-6 pt-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {githubUser.public_repos ?? 0}
                      </div>
                      <div className="text-sm text-white/60">
                        Public repos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {githubUser.followers ?? 0}
                      </div>
                      <div className="text-sm text-white/60">
                        GitHub followers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {githubUser.created_at
                          ? new Date().getFullYear() -
                            new Date(githubUser.created_at).getFullYear()
                          : "4+"}
                      </div>
                      <div className="text-sm text-white/60">
                        Years on GitHub
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-8">
              Experience
            </h3>
            <div className="space-y-8">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative pl-8 border-l-2 border-white/10"
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
                          <span className="text-cyan-400 mt-1.5 text-xs">▸</span>
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

        {/* TicTacToe easter egg — clearly labeled, below main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Easter egg — take a break
            </p>
          </div>
          <TicTacToe />
        </motion.div>
      </div>
    </section>
  );
}
