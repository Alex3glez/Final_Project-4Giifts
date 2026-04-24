export default {
  name: 'season',
  title: 'Season Theme',
  type: 'document',
  options: {
    canvasApp: {
      purpose: 'Un tema estacional o campaña (ej. Navidad, San Valentín) que cambia dinámicamente los colores, tipografías y contenido destacado de la tienda.',
    },
  },
  fields: [
    {
      name: 'name',
      title: 'Theme Name',
      type: 'string',
      description: 'Internal name for the theme (e.g. San Valentin 2026)',
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: 'El título o nombre exacto de la campaña (ej. "Black Friday Sale"). Es obligatorio y debe mapearse siempre a partir del contenido.',
        }
      }
    },
    {
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Set to true to force this theme to be active immediately',
      initialValue: false,
      options: {
        canvasApp: { exclude: true }
      }
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'Fecha de inicio de la temporada. La IA la generará automáticamente basándose en la festividad.',
      options: {
        canvasApp: {
          purpose: 'La fecha de inicio del evento en formato YYYY-MM-DD. Debe inferirse de la campaña.',
        }
      }
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Fecha de fin de la temporada. La IA la generará automáticamente.',
      options: {
        canvasApp: {
          purpose: 'La fecha de fin del evento en formato YYYY-MM-DD. Debe inferirse de la campaña.',
        }
      }
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher number means this theme will override others if dates overlap',
      initialValue: 0,
      options: {
        canvasApp: { exclude: true }
      }
    },
    {
      name: 'colorPrimary',
      title: 'Primary Color',
      type: 'string',
      description: 'Código HEX del color principal (ej. #FF0000). Debe combinar con la festividad.',
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: 'Color hexadecimal principal representativo (ej. #FF0000 para Navidad). Obligatorio.',
        }
      }
    },
    {
      name: 'colorSecondary',
      title: 'Secondary Color',
      type: 'string',
      description: 'CSS color code (e.g. #F75270)',
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: 'Color hexadecimal secundario que contraste o complemente al principal. Obligatorio.',
        }
      }
    },
    {
      name: 'colorAccent',
      title: 'Accent Color',
      type: 'string',
      description: 'CSS color code (e.g. #F7CAC9)',
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: 'Color hexadecimal de acento para detalles. Obligatorio.',
        }
      }
    },
    {
      name: 'gradientStart',
      title: 'Gradient Start',
      type: 'string',
    },
    {
      name: 'gradientEnd',
      title: 'Gradient End',
      type: 'string',
    },
    {
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      description: 'Google Font name (e.g. Inter, Roboto)',
      initialValue: 'Inter',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    },
    {
      name: 'heroCTA',
      title: 'Hero CTA Text',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        aiAssist: {
          imageInstructionField: 'prompt',
        },
      },
      fields: [
        {
          name: 'prompt',
          type: 'string',
          title: 'AI Image Prompt',
          description: 'Instrucciones para la IA. Se recomienda mencionar el nombre de la festividad o campaña.',
          options: {
            canvasApp: {
              purpose: 'Crea un prompt en inglés detallado para generar una imagen de fondo (hero image) basándose en el nombre de la campaña. Describe una escena festiva sin texto, de alta calidad.',
            }
          }
        },
      ],
    },
    {
      name: 'logoOverride',
      title: 'Custom Logo',
      type: 'image',
      options: {
        aiAssist: {
          imageInstructionField: 'prompt',
        },
      },
      fields: [
        {
          name: 'prompt',
          type: 'string',
          title: 'AI Image Prompt',
          description: 'Instrucciones para la IA para generar el logo.',
          options: {
            canvasApp: {
              purpose: 'Crea un prompt en inglés detallado para generar una variación del logo de 4Giifts adaptado a la festividad. El diseño debe ser minimalista, similar a un logo de app moderno, con el texto "4Giifts".',
            }
          }
        },
      ],
    },
    {
      name: 'navbarStyle',
      title: 'Navbar Style',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
      initialValue: 'light',
    },
    {
      name: 'particleEffect',
      title: 'Particle Effect',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Hearts', value: 'hearts' },
          { title: 'Snow', value: 'snow' },
          { title: 'Stars', value: 'stars' },
        ],
      },
      initialValue: 'none',
    },
    {
      name: 'featuredEmoji',
      title: 'Featured Emoji',
      type: 'string',
    },
    {
      name: 'bannerMessage',
      title: 'Top Banner Message',
      type: 'string',
    },
    {
      name: 'featuredItems',
      title: 'Los más elegidos por la comunidad',
      type: 'array',
      of: [
        {
          name: 'featuredItem',
          type: 'object',
          fields: [
            { name: 'name', title: 'Product Name', type: 'string' },
            { name: 'price', title: 'Approximate Price', type: 'string' },
            { name: 'image', title: 'Product Image', type: 'image' },
            { name: 'link', title: 'Purchase Link', type: 'url' },
          ],
        },
      ],
    },
  ],
}
