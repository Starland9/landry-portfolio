import Image from "next/image";
import type { ImageAsset } from "@/content";
import { cn } from "@/lib/utils";

type ImageFrameProps = {
  image: ImageAsset;
  alt: string;
  ratio?: "4/3" | "16/9";
  sizes: string;
  /** Above-the-fold image (likely LCP): load right away with high priority. */
  eager?: boolean;
  className?: string;
};

/**
 * Uniform frame for heterogeneous screenshots: same ratio and neutral mat for
 * every project, image fully visible (never cropped) and never upscaled past
 * its intrinsic size.
 */
export function ImageFrame({
  image,
  alt,
  ratio = "4/3",
  sizes,
  eager,
  className,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "grid place-items-center overflow-hidden rounded-frame border border-border bg-frame p-[clamp(16px,6%,40px)] transition-colors",
        ratio === "4/3" ? "aspect-[4/3]" : "aspect-video",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="h-auto max-h-full w-auto max-w-full rounded-[4px] object-contain"
      />
    </div>
  );
}
