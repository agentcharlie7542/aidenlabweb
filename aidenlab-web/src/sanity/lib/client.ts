import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

/**
 * Utility wrapper for fetching data with Next.js caching support
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<QueryResponse> {
  // If no project is configured yet, mock the fetch to avoid 404 errors
  if (projectId === 'your-project-id') {
    return [] as unknown as QueryResponse;
  }

  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags,
    },
  });
}
