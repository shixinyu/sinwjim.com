import { defineConfig } from 'tinacms';

const branch =
  process.env.TINA_BRANCH ||
  process.env.HEAD ||
  process.env.GITHUB_REF_NAME ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  schema: {
    collections: [
      {
        name: 'question',
        label: 'Questions',
        path: 'src/content/questions',
        format: 'md',
        ui: {
          router: ({ document }) => `/questions/${document._sys.filename}/`,
        },
        fields: [
          { name: 'category', label: 'Category', type: 'string', required: true },
          { name: 'title', label: 'Title', type: 'string', required: true, isTitle: true },
          { name: 'excerpt', label: 'Excerpt', type: 'string', ui: { component: 'textarea' }, required: true },
          { name: 'author', label: 'Author', type: 'string', required: true },
          { name: 'role', label: 'Role', type: 'string', required: true },
          { name: 'votes', label: 'Votes', type: 'string', required: true },
          { name: 'answers', label: 'Answers', type: 'number', required: true },
          { name: 'publishedAt', label: 'Published At', type: 'datetime' },
          { name: 'pageTitle', label: 'Page Title', type: 'string', required: true },
          { name: 'pageDescription', label: 'Page Description', type: 'string', ui: { component: 'textarea' }, required: true },
          { name: 'lead', label: 'Lead', type: 'string', ui: { component: 'textarea' }, required: true },
          {
            name: 'stats',
            label: 'Stats',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || 'Stat' }),
            },
            fields: [
              { name: 'value', label: 'Value', type: 'string', required: true },
              { name: 'label', label: 'Label', type: 'string', required: true },
            ],
          },
          { name: 'whyNowTitle', label: 'Why Now Title', type: 'string', required: true },
          { name: 'whyNowText', label: 'Why Now Text', type: 'string', ui: { component: 'textarea' }, required: true },
          { name: 'topics', label: 'Topics', type: 'string', list: true },
          { name: 'answerTitle', label: 'Answer Title', type: 'string', required: true },
          { name: 'summary', label: 'Summary', type: 'string', list: true },
          { name: 'relatedSlugs', label: 'Related Slugs', type: 'string', list: true },
          {
            name: 'body',
            label: 'Body',
            type: 'rich-text',
            isBody: true,
          },
        ],
      },
      {
        name: 'home',
        label: 'Home Settings',
        path: 'src/content/site',
        format: 'yaml',
        match: {
          include: 'home',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
            createNestedFolder: false,
          },
        },
        fields: [
          {
            name: 'featuredQuestionSlugs',
            label: 'Featured Question Slugs',
            type: 'string',
            list: true,
          },
          { name: 'heroFeaturedSlug', label: 'Hero Featured Slug', type: 'string', required: true },
          {
            name: 'editorialPicks',
            label: 'Editorial Picks',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || 'Pick' }),
            },
            fields: [
              { name: 'label', label: 'Label', type: 'string', required: true },
              { name: 'slug', label: 'Slug', type: 'string', required: true },
            ],
          },
        ],
      },
    ],
  },
});
