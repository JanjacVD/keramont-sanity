import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {inboxTool} from './tools/inbox.tool'
import {deployTool} from './tools/deploy.tool'

export default defineConfig({
  name: 'default',
  title: 'Keramont',

  projectId: 'lrvkxn72',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), inboxTool()],
  tools: [deployTool],

  schema: {
    types: schemaTypes,
  },
})
