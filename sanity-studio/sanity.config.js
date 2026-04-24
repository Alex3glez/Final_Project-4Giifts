import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {assist} from '@sanity/assist'
import {presentationTool} from 'sanity/presentation'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'
import {schemaTypes} from './schemaTypes'
import {ThemeDashboardWidget} from './components/ThemeDashboard'

export default defineConfig({
  name: 'default',
  title: '4Giifts Studio',

  projectId: 'c3139aap',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: '2024-01-01'}),

    // ✨ AI Assist — genera contenido automáticamente en cada campo
    assist(),

    // 👁️ Visual Editing — edita la web haciendo clic en cualquier campo
    presentationTool({
      previewUrl: {
        origin: typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : 'https://sample-service-name-h3u9.onrender.com',
        preview: '/',
      },
      name: 'presentation',
      title: '👁️ Vista Previa Web',
    }),

    // 📊 Dashboard personalizado
    dashboardTool({
      widgets: [
        {
          name: 'theme-status',
          component: ThemeDashboardWidget,
          layout: {width: 'large'},
        },
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
