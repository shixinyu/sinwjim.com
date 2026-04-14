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

  const urls = [
    {
      loc: toAbsoluteUrl('/'),
    },
    {
      loc: toAbsoluteUrl('/robots.txt'),
    },
    ...questions.map((question) => ({
      loc: toAbsoluteUrl(`/questions/${question.id}/`),
      lastmod: question.data.publishedAt ? formatDate(question.data.publishedAt) : undefined,
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
