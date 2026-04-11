import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    category: z.string(),
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    role: z.string(),
    votes: z.string(),
    answers: z.number(),
    pageTitle: z.string(),
    pageDescription: z.string(),
    lead: z.string(),
    stats: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    whyNowTitle: z.string(),
    whyNowText: z.string(),
    topics: z.array(z.string()),
    answerTitle: z.string(),
    summary: z.array(z.string()),
    relatedSlugs: z.array(z.string())
  })
});

const site = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/site' }),
  schema: z.object({
    featuredQuestionSlugs: z.array(z.string()),
    heroFeaturedSlug: z.string(),
    editorialPicks: z.array(
      z.object({
        label: z.string(),
        slug: z.string()
      })
    )
  })
});

export const collections = { questions, site };
