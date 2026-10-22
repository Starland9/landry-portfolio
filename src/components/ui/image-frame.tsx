import Image from "next/image";
import type { ImageAsset } from "@/content";
import { cn } from "@/lib/utils";

// Below this width an image would turn blurry once stretched to fill a frame:
// it is shown whole, centred on the neutral mat, instead (e.g. a 240 px app icon).
const MIN_COVER_WIDTH = 600;

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
 * Uniform frame for project screenshots: same ratio everywhere, image in
 * `cover` (fills the frame, cropped if needed, never distorted).
 */
export function ImageFrame({
  image,
  alt,
  ratio = "4/3",
  sizes,
  eager,
  className,
}: ImageFrameProps) {
  const cover = image.width >= MIN_COVER_WIDTH;
  const loading = eager
    ? ({ loading: "eager", fetchPriority: "high" } as const)
    : ({ loading: "lazy" } as const);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-frame border border-border bg-frame transition-colors",
        ratio === "4/3" ? "aspect-[4/3]" : "aspect-video",
        !cover && "grid place-items-center p-[clamp(16px,6%,40px)]",
        className,
      )}
    >
      {cover ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          {...loading}
          className="object-cover"
        />
      ) : (
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          {...loading}
          className="h-auto max-h-full w-auto max-w-full rounded-sm object-contain"
        />
      )}
    </div>
  );
}
