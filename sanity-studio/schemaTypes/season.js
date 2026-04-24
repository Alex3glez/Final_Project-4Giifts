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
      type: 'date',
      description: 'Fecha de inicio de la temporada. La IA la generará automáticamente basándose en la festividad.',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Fecha de fin de la temporada. La IA la generará automáticamente.',
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
      description: 'Código HEX del color principal (ej. #FF0000). Debe combinar con la festividad.',
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
