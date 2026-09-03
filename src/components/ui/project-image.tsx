"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function ProjectImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: ProjectImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(priority ?? false);

  if (error) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-white/5 text-white/30",
          fill ? "absolute inset-0" : "",
          className,
        )}
        style={!fill ? { width, height } : undefined}
      >
        <ImageOff className="w-8 h-8" />
        <span className="text-xs">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      className={cn(className, loaded && "loaded")}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
    />
  );
}
