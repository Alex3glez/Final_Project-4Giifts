export default {
  name: 'season',
  title: 'Season Theme',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Theme Name',
      type: 'string',
      description: 'Internal name for the theme (e.g. San Valentin 2026)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Set to true to force this theme to be active immediately',
      initialValue: false,
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'Fecha de inicio en formato YYYY-MM-DD (ej. 2026-06-14). La IA la rellenará automáticamente.',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true
          return /^\d{4}-\d{2}-\d{2}$/.test(val) || 'El formato debe ser YYYY-MM-DD'
        }),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'Fecha de fin en formato YYYY-MM-DD (ej. 2026-06-22). La IA la rellenará automáticamente.',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return true
          return /^\d{4}-\d{2}-\d{2}$/.test(val) || 'El formato debe ser YYYY-MM-DD'
        }),
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher number means this theme will override others if dates overlap',
      initialValue: 0,
    },
    {
      name: 'colorPrimary',
      title: 'Primary Color',
      type: 'string',
      description: 'CSS color code (e.g. #DC143C)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorSecondary',
      title: 'Secondary Color',
      type: 'string',
      description: 'CSS color code (e.g. #F75270)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorAccent',
      title: 'Accent Color',
      type: 'string',
      description: 'CSS color code (e.g. #F7CAC9)',
      validation: (Rule) => Rule.required(),
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
    },
    {
      name: 'logoOverride',
      title: 'Custom Logo',
      type: 'image',
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
