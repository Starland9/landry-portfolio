"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Send,
  CheckCircle,
} from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setForm({ name: "", email: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Prêt à collaborer ? Discutons de votre prochain projet !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Envoyez-moi un message
              </h3>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 mb-6 bg-green-500/20 border border-green-400/50 rounded-xl text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Message envoyé avec succès !</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all resize-none"
                      placeholder="Parlez-moi de votre projet..."
                    />
                  </div>
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </GlassButton>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Informations de contact
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/50 rounded-xl flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{info.title}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-cyan-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Social Links */}
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Suivez-moi</h3>
              <div className="grid grid-cols-3 gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl text-white/70 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-8 h-8" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* Availability Status */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-medium">
                  Disponible pour de nouveaux projets
                </span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                Je suis actuellement ouvert aux opportunités de collaboration et
                aux projets freelance.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
