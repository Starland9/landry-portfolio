"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                S9
              </div>
              <span className="text-white font-bold text-xl">Starland9</span>
            </div>
            <p className="text-white/70 max-w-sm">
              Software engineer building production web and mobile applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Navigation</h3>
            <nav className="space-y-2" aria-label="Footer navigation">
              {[
                { label: "Home", section: "hero" },
                { label: "About", section: "about" },
                { label: "Projects", section: "projects" },
                { label: "Contact", section: "contact" },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    document
                      .getElementById(item.section)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ x: 5 }}
                  className="block text-white/70 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@starland9.dev"
                className="block text-white/70 hover:text-cyan-400 transition-colors"
              >
                contact@starland9.dev
              </a>
              <div className="flex gap-3 pt-2">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
                    aria-label={`${social.name} - ${social.url}`}
                  >
                    <social.icon className="w-4 h-4" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span>© {currentYear} Landry Simo. Built with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>and lots of coffee ☕</span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/50 text-cyan-400 hover:from-cyan-500/30 hover:to-purple-600/30 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
