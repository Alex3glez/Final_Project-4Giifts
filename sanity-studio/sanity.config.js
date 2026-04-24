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
    visionTool(),

    // ✨ AI Assist — genera contenido automáticamente en cada campo
    assist(),

    // 👁️ Visual Editing — edita la web haciendo clic en cualquier campo
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000',
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
        projectInfoWidget(),
        projectUsersWidget(),
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
