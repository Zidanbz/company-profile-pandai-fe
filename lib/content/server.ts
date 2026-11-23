import 'server-only';
import { cache } from 'react';
export const getSiteContent = cache(async (): Promise<Record<string, string>> => {
  try {
    const base = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';
    const response = await fetch(`${base}/content`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Content API: ${response.status}`);
    const result = await response.json();
    if (!result.success || !result.data?.dictionary) throw new Error('Invalid content response');
    return result.data.dictionary;
  } catch (error) {
    // Let Next.js opt out of prerendering instead of caching fallback content.
    if (error && typeof error === "object" && "digest" in error && error.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error('Konten Pandai belum dapat dimuat; menggunakan konten awal.', error instanceof Error ? error.message : 'API error');
    return {};
  }
});
