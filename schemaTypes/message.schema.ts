// /schemas/message.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'message',
  title: 'Message',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'message', title: 'Message', type: 'text'}),
    defineField({name: 'starred', title: 'Starred', type: 'boolean', initialValue: false}),
    defineField({name: 'viewed', title: 'Viewed', type: 'boolean', initialValue: false}),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
