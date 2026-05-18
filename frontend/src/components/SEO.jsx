import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO — page-level <head> manager.
 * Applies <title>, meta description, canonical, Open Graph / Twitter, and
 * optional JSON-LD structured data consistently across every route.
 */
const SITE_NAME = 'Infotron Solutions';
const SITE_URL = 'https://infotronsolutions.com';
const DEFAULT_IMAGE =
  'https://customer-assets.emergentagent.com/job_ba897003-eeca-4b0e-8e12-dd77cec76f35/artifacts/mcntdahb_INFOTRON%20Gradient%20Logo%20cropped.png';
const DEFAULT_IMAGE_W = 1200;
const DEFAULT_IMAGE_H = 630;
const TWITTER_HANDLE = '@InfotronSol';

const SEO = ({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  imageAlt,
  imageWidth = DEFAULT_IMAGE_W,
  imageHeight = DEFAULT_IMAGE_H,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  keywords,
  schema,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const baseUrl =
    typeof window !== 'undefined' && window.location
      ? `${window.location.protocol}//${window.location.host}`
      : SITE_URL;
  const canonical = path ? `${baseUrl}${path}` : baseUrl;
  const resolvedImageAlt = imageAlt || fullTitle;
  const robotsContent = noIndex
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

  // Normalize schema to an array
  const schemaList = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={resolvedImageAlt} />
      {publishedTime && type === 'article' && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && type === 'article' && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {author && type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={resolvedImageAlt} />

      {/* JSON-LD structured data */}
      {schemaList.map((s, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
