import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PageMetadata, getMetadata } from '@/config/metadata';

interface MetaTagsProps {
  // Custom metadata can be provided to override defaults
  metadata?: PageMetadata;
}

/**
 * MetaTags component using React Helmet Async for managing document head metadata
 * This component uses a strict metadata configuration and throws errors if metadata is missing
 */
export const MetaTags: React.FC<MetaTagsProps> = ({ metadata }) => {
  const location = useLocation();
  
  // Get metadata for current path or use provided custom metadata
  const meta = metadata || getMetadata(location.pathname);
  
  return (
    <Helmet>
      {/* Basic metadata - all fields are required by our type system */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}
      
      {/* Keywords */}
      {meta.keywords && <meta name="keywords" content={meta.keywords.join(', ')} />}
      
      {/* Indexing directives */}
      {meta.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${window.location.origin}${location.pathname}`} />
    </Helmet>
  );
};

export default MetaTags;
