import { memo } from "react";

type UrlMap = Record<string, string>;

const jpgs = import.meta.glob("/src/assets/case-studies/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as UrlMap;

const webps = import.meta.glob("/src/assets/case-studies/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as UrlMap;

const avifs = import.meta.glob("/src/assets/case-studies/*.avif", {
  eager: true,
  query: "?url",
  import: "default",
}) as UrlMap;

const baseName = (path: string) => path.split("/").pop()!.replace(/\.[a-z0-9]+$/i, "");

// Map the resolved (hashed) jpg URL -> modern format URLs
const modernByJpgUrl: Record<string, { webp?: string; avif?: string }> = {};
for (const [path, url] of Object.entries(jpgs)) {
  const name = baseName(path);
  const webpEntry = Object.entries(webps).find(([p]) => baseName(p) === name);
  const avifEntry = Object.entries(avifs).find(([p]) => baseName(p) === name);
  modernByJpgUrl[url] = { webp: webpEntry?.[1], avif: avifEntry?.[1] };
}

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Class applied to the wrapping <picture> element */
  pictureClassName?: string;
}

/**
 * Renders an <img> wrapped in <picture> with AVIF/WebP sources when
 * matching optimized variants exist for the imported asset.
 */
const SmartImage = memo(({ src, alt, pictureClassName, ...imgProps }: SmartImageProps) => {
  const modern = modernByJpgUrl[src];

  if (!modern?.avif && !modern?.webp) {
    return <img src={src} alt={alt} {...imgProps} />;
  }

  return (
    <picture className={pictureClassName}>
      {modern.avif && <source srcSet={modern.avif} type="image/avif" />}
      {modern.webp && <source srcSet={modern.webp} type="image/webp" />}
      <img src={src} alt={alt} {...imgProps} />
    </picture>
  );
});

SmartImage.displayName = "SmartImage";

export default SmartImage;
