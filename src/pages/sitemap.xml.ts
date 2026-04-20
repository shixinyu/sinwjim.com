import type { APIRoute } from 'astro';
import { getQuestionEntries } from '../data/content';

export const prerender = true;

const siteUrl = 'https://sinwjim.com';

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function formatDate(date: Date) {
  return date.toISOString();
}

export const GET: APIRoute = async () => {
  const questions = await getQuestionEntries();
  const featuredQuestionCount = 3;
  const paginatedQuestionCount = Math.max(0, questions.length - featuredQuestionCount);
  const paginatedPageCount = Math.ceil(paginatedQuestionCount / 10);

  const urls = [
    {
      loc: toAbsoluteUrl('/'),
    },
    {
      loc: toAbsoluteUrl('/robots.txt'),
    },
    ...questions.map((question) => ({
      loc: toAbsoluteUrl(`/${question.id}/`),
      lastmod: question.data.publishedAt ? formatDate(question.data.publishedAt) : undefined,
    })),
    ...Array.from({ length: Math.max(0, paginatedPageCount - 1) }, (_, index) => ({
      loc: toAbsoluteUrl(`/page/${index + 2}/`),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
