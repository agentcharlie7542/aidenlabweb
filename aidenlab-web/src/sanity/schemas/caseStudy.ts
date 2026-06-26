import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'platform',
      title: 'Platform / Badge',
      type: 'string',
      description: 'e.g., Qoo10 · 헤어케어 or CASE 01 · GLOW U',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured?',
      type: 'boolean',
      description: 'If true, this case will appear as a large card and on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'cornerTag',
      title: 'Corner Tag (Featured Only)',
      type: 'string',
      description: 'e.g., Qoo10 · 헤어케어 · 6주',
    }),
    defineField({
      name: 'kpis',
      title: 'KPIs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
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
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
  ],
});
