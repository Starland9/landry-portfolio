"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string | null;
  featured: boolean;
  category: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(timer);
  }, [projects.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      zIndex: 10,
      x: 0,
      opacity: 1,
      position: "absolute" as const,
    },
    exit: (direction: number) => ({
      zIndex: 5,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      );
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full absolute inset-0 flex items-center z-10"
          >
            <GlassCard className="p-4 sm:p-6 lg:p-12 w-full" hover>
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[450px] sm:min-h-[500px] lg:min-h-[400px]">
                <div className="space-y-4 lg:space-y-6 order-2 lg:order-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/50 rounded-full text-cyan-400 text-sm font-medium">
                      Projet Vedette {currentIndex + 1}/{projects.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white break-words">
                    {projects[currentIndex].title}
                  </h3>

                  <p className="text-white/70 text-base lg:text-lg leading-relaxed">
                    {projects[currentIndex].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {projects[currentIndex].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <GlassButton
                      href={projects[currentIndex].liveUrl}
                      variant="primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {projects[currentIndex].category === "mobile"
                        ? "Télécharger"
                        : "Voir le site"}
                    </GlassButton>
                    {projects[currentIndex].githubUrl && (
                      <GlassButton
                        href={projects[currentIndex].githubUrl}
                        variant="outline"
                      >
                        <Github className="w-4 h-4" />
                        Code source
                      </GlassButton>
                    )}
                  </div>
                </div>

                <div className="relative group order-1 lg:order-2 flex items-center justify-center">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/20 overflow-hidden w-full max-w-lg">
                    <Image
                      className="rounded-xl object-cover w-full h-full"
                      src={projects[currentIndex].image}
                      alt={projects[currentIndex].title}
                      width={600}
                      height={400}
                      priority={currentIndex === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
          onClick={() => paginate(-1)}
          aria-label="Projet précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
          onClick={() => paginate(1)}
          aria-label="Projet suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-cyan-400 to-purple-600 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller au projet ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentIndex + 1) / projects.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
