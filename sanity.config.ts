import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {inboxTool} from './tools/inbox.tool'

export default defineConfig({
  name: 'default',
  title: 'Keramont',

  projectId: 'lrvkxn72',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), inboxTool()],

  schema: {
    types: schemaTypes,
  },
})
