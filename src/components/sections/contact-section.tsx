"use client";

import { motion } from "framer-motion";
import { useState, useId } from "react";
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
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Le nom est requis";
  else if (form.name.trim().length < 2) errors.name = "Le nom est trop court";
  if (!form.email.trim()) errors.email = "L'email est requis";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Format d'email invalide";
  if (!form.message.trim()) errors.message = "Le message est requis";
  else if (form.message.trim().length < 10)
    errors.message = "Le message doit contenir au moins 10 caractères";
  return errors;
}

export default function ContactSection() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      // Simulation réaliste avec latence réseau
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 500),
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all ${
      errors[field] ? "border-red-400/60" : "border-white/20"
    }`;

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="contact-heading"
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4"
          >
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

              {/* Success state — feedback honnête */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 mb-6 bg-green-500/10 border border-green-400/30 rounded-xl text-center"
                  role="status"
                >
                  <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                  <h4 className="text-green-400 font-semibold text-lg mb-2">
                    Démo — Message reçu ✓
                  </h4>
                  <p className="text-green-300/70 text-sm">
                    Ceci est une démonstration. En production, votre message
                    serait envoyé.
                    <br />
                    Pour me contacter directement :{" "}
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="underline hover:text-green-200 inline-flex items-center gap-1"
                    >
                      {PERSONAL_INFO.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </motion.div>
              )}

              {/* Error state */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 mb-6 bg-red-500/10 border border-red-400/30 rounded-xl text-red-400"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    Une erreur est survenue. Veuillez réessayer ou me contacter
                    directement à{" "}
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="underline"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-4">
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor={nameId}
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Nom complet <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id={nameId}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? `${nameId}-error` : undefined
                      }
                      className={inputClasses("name")}
                      placeholder="Votre nom"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p
                        id={`${nameId}-error`}
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor={emailId}
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id={emailId}
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? `${emailId}-error` : undefined
                      }
                      className={inputClasses("email")}
                      placeholder="votre@email.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p
                        id={`${emailId}-error`}
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor={messageId}
                      className="block text-white/80 text-sm font-medium mb-2"
                    >
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? `${messageId}-error` : undefined
                      }
                      rows={6}
                      className={inputClasses("message") + " resize-none"}
                      placeholder="Parlez-moi de votre projet..."
                    />
                    {errors.message && (
                      <p
                        id={`${messageId}-error`}
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === "submitting"}
                  aria-label={
                    status === "submitting"
                      ? "Envoi en cours..."
                      : "Envoyer le message"
                  }
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </span>
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
              <div className="space-y-4" role="list">
                {CONTACT_INFO.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                    role="listitem"
                  >
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/50 rounded-xl flex items-center justify-center"
                      aria-hidden="true"
                    >
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
              <div className="grid grid-cols-3 gap-4" role="list">
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
                    role="listitem"
                    aria-label={`${social.name} - ${PERSONAL_INFO.fullName}`}
                  >
                    <social.icon className="w-8 h-8" aria-hidden="true" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* Availability Status */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                  aria-hidden="true"
                />
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
