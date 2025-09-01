// /schemas/singleMedia.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Media Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'file', // using file type to allow both images and videos
      options: {
        accept: 'image/*,video/*', // accept images and videos
      },
      validation: (Rule) => Rule.required().error('Media is required'),
    }),
    defineField({
      name: 'isVideo',
      title: 'Is Video?',
      type: 'boolean',
      description: 'Check if the uploaded media is a video',
      initialValue: false,
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required().error('Alt text is required'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Ceramics', value: 'ceramics'},
          {title: 'Microcement', value: 'microcement'},
          {title: 'Epoxy', value: 'epoxy'},
        ],
      },
      validation: (Rule) => Rule.required().error('Type is required'),
    }),
  ],
  preview: {
    select: {
      media: 'media',
      title: 'alt',
      subtitle: 'type',
    },
    prepare(selection) {
      const {media, title, subtitle} = selection
      return {
        media,
        title,
        subtitle,
      }
    },
  },
})
