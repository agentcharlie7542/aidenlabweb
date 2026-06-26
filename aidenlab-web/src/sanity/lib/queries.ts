import { groq } from 'next-sanity';

// Fetches all case studies, ordered by creation date (newest first)
export const getAllCasesQuery = groq`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    brandName,
    platform,
    category,
    isFeatured,
    cornerTag,
    kpis,
    "imageUrl": mainImage.asset->url,
    quote
  }
`;

// Fetches only featured case studies
export const getFeaturedCasesQuery = groq`
  *[_type == "caseStudy" && isFeatured == true] | order(_createdAt desc) {
    _id,
    title,
    brandName,
    platform,
    category,
    isFeatured,
    cornerTag,
    kpis,
    "imageUrl": mainImage.asset->url,
    quote
  }
`;

// Fetches all insights
export const getAllInsightsQuery = groq`
  *[_type == "insight"] | order(publishedAt desc) {
    _id,
    title,
    category,
    description,
    publishedAt,
    isFeatured,
    "imageUrl": mainImage.asset->url,
    "pdfUrl": pdfFile.asset->url
  }
`;

// Fetches only featured insights
export const getFeaturedInsightsQuery = groq`
  *[_type == "insight" && isFeatured == true] | order(publishedAt desc) {
    _id,
    title,
    category,
    description,
    publishedAt,
    isFeatured,
    "imageUrl": mainImage.asset->url,
    "pdfUrl": pdfFile.asset->url
  }
`;
