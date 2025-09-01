// /schemas/singleImage.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required().error('Alt text is required'),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'alt',
    },
  },
})
