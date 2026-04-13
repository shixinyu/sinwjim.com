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
    votes: z.string().default('0'),
    answers: z.number().default(0),
    pageTitle: z.string().optional(),
    pageDescription: z.string().optional(),
    lead: z.string().optional(),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string()
        })
      )
      .default([]),
    whyNowTitle: z.string().optional(),
    whyNowText: z.string().optional(),
    topics: z.array(z.string()).default([]),
    answerTitle: z.string().optional(),
    summary: z.array(z.string()).default([]),
    relatedSlugs: z.array(z.string()).default([])
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
