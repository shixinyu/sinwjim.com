import type { CollectionEntry } from 'astro:content';
import { getEntry } from 'astro:content';

export async function getQuestionEntry(slug: string): Promise<CollectionEntry<'questions'>> {
  const entry = await getEntry('questions', slug);
  if (!entry) {
    throw new Error(`Unknown question slug: ${slug}`);
  }

  return entry;
}

export async function getQuestionsBySlugs(slugs: string[]): Promise<CollectionEntry<'questions'>[]> {
  return Promise.all(slugs.map((slug) => getQuestionEntry(slug)));
}

export async function getHomeConfig(): Promise<CollectionEntry<'site'>> {
  const entry = await getEntry('site', 'home');
  if (!entry) {
    throw new Error('Missing home site configuration');
  }

  return entry;
}
