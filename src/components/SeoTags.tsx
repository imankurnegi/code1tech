import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SeoTags = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
}: SEOProps) => {
  const siteTitle = "Code1 Tech Systems";

  // ✅ fallback handling
  const finalTitle = title
    ? `${title} | ${siteTitle}`
    : siteTitle;

  const finalDescription =
    description || "Code1 Tech Systems provides scalable tech and AI solutions to grow your business.";

  const finalOgImage =
    ogImage || "";

  return (
    <Helmet>
      {/* ✅ always present */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* ✅ canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* ✅ Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
    </Helmet>
  );
};

export default SeoTags;