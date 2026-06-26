import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Report', value: 'REPORT' },
          { title: 'Case', value: 'CASE' },
          { title: 'Trend', value: 'TREND' },
          { title: 'Press', value: 'PRESS' },
          { title: 'Aidenlab News', value: '에이든랩' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Used for featured reports or long descriptions.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      options: {
        dateFormat: 'YYYY.MM.DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured?',
      type: 'boolean',
      description: 'If true, will appear large on the Insights page (e.g., Whitepaper).',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File (Optional)',
      type: 'file',
      description: 'Upload a PDF file for reports.',
    }),
  ],
});
