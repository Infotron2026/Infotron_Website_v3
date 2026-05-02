import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO — page-level <head> manager.
 * Applies <title>, meta description, canonical, and Open Graph / Twitter
 * tags consistently across every route.
 */
const SITE_NAME = 'Infotron Solutions';
const DEFAULT_IMAGE =
  'https://customer-assets.emergentagent.com/job_ba897003-eeca-4b0e-8e12-dd77cec76f35/artifacts/mcntdahb_INFOTRON%20Gradient%20Logo%20cropped.png';

const SEO = ({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const baseUrl =
    typeof window !== 'undefined' && window.location
      ? `${window.location.protocol}//${window.location.host}`
      : 'https://infotronsolutions.com';
  const canonical = path ? `${baseUrl}${path}` : baseUrl;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
