// ./schemas/rating.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'rating',
  title: 'Rating',
  type: 'document',
  fields: [
    defineField({
      name: 'submitter',
      title: 'Submitter',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rating: 'rating',
      authorName: 'submitter.name',
    },
    prepare(selection) {
      const { title, rating, authorName } = selection;
      return {
        title: `${title} (${rating}★)`,
        subtitle: `By ${authorName ?? 'Unknown user'}`,
      };
    },
  },
});
