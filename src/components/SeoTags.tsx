import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SeoTags = ({ title, description, canonical, ogType = "website", ogImage }: SEOProps) => {
  const siteTitle = "Code1 Tech Systems";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const basePath = '/code1new/frontend/';

  // Prepend base path to relative URLs
  const getAbsoluteUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http')) return url;
    return `${basePath}${url.replace(/^\//, '')}`;
  };

  const absoluteCanonical = canonical ? getAbsoluteUrl(canonical) : '';
  const absoluteOgImage = ogImage ? getAbsoluteUrl(ogImage) : '';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {absoluteCanonical && <link rel="canonical" href={absoluteCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {absoluteOgImage && <meta property="og:image" content={absoluteOgImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {absoluteOgImage && <meta name="twitter:image" content={absoluteOgImage} />}
    </Helmet>
  );
};

export default SeoTags;
