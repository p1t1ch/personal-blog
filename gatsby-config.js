const config = require('./config')

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    baseUrl: config.baseUrl,
    lang: config.lang,
    facebookUsername: config.facebookUsername,
    twitterUsername: config.twitterUsername,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '@theme': `${__dirname}/config/theme.ts`,
          '@': `${__dirname}/src`,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 75,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: config.containerWidth,
              showCaptions: ['title'],
              withWebp: true,
              tracedSVG: {
                color: config.tracedSVGColor,
              },
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '>',
              prompt: {
                global: true,
              },
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        titleProp: true,
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        defaultSizes: 'gzip',
        openAnalyzer: false,
        generateStatsFile: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        display: 'standalone',
        name: config.title,
        short_name: config.shortTitle,
        description: config.description,
        lang: config.lang,
        icon: config.favicon,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        enableIdentityWidget: false,
      },
    },
    'gatsby-plugin-offline',
  ],
}
