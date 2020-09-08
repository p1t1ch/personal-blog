import React from 'react'
import 'focus-visible'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { buttons, transitions, normalize } from 'polished'
// import Commissioner from '@/fonts/Commissioner.woff2'
import { Theme } from '@theme'

const GlobalStyles = () => {
  const theme = useTheme<Theme>()

  return (
    <Global
      styles={[
        ...normalize(),
        // {
        //   '@font-face': {
        //     fontFamily: 'Commissioner',
        //     src: `url(${Commissioner}) format('woff2-variations')`,
        //     fontDisplay: 'swap',
        //     fontWeight: '100 900' as any,
        //   },
        // },
        {
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            fontFamily: [theme.typography.family, ...theme.typography.stack].join(', '),
            ...theme.typography.styles.body,
            backgroundColor: theme.colors.primary,
            color: theme.colors.primary,
          },
          'h1, h2, h3, h4, h5, h6, p, ol, ul, dl, dd, hr, pre': {
            margin: 0,
            padding: 0,
          },
          '.js-focus-visible :focus:not(.focus-visible)': {
            outline: 'none',
          },
          ':focus': {
            outline: `3px solid ${theme.colors.primary}`,
            outlineOffset: 2,
          },
          [buttons()]: {
            border: 'none',
            ...transitions(['color', 'background-color'], theme.transitions.basic),
          },
          a: {
            textDecoration: 'none',
            color: theme.colors.primary,
            ...transitions('color', theme.transitions.basic),
          },
          svg: {
            fill: 'currentColor',
          },
          li: {
            listStyle: 'none',
          },
          blockquote: {
            margin: 0,
          },
        },
        `
        /**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
.gatsby-highlight {
  background-color: #fdf6e3;
  border-radius: 0.3em;
  margin: 0.5em 0;
  padding: 1em;
  overflow: auto;
}

/**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 * 3. Adjust the position of the line numbers
 */
.gatsby-highlight pre[class*="language-"] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left; /* 1 */
  min-width: 100%; /* 2 */
}

/**
 * If you already use line highlighting
 */

/* Adjust the position of the line numbers */
.gatsby-highlight pre[class*="language-"].line-numbers {
  padding-left: 2.8em;
}

/**
 * If you only want to use line numbering
 */

.gatsby-highlight {
  background-color: #fdf6e3;
  border-radius: 0.3em;
  margin: 0.5em 0;
  padding: 1em;
  overflow: auto;
}

.gatsby-highlight pre[class*="language-"].line-numbers {
  padding: 0;
  padding-left: 2.8em;
  overflow: initial;
}

        .command-line-prompt > span:before {
          color: #999;
          content: " ";
          display: block;
          padding-right: 0.8em;
        }

        /* Prompt for all users */
        .command-line-prompt > span[data-user]:before {
          content: "[" attr(data-user) "@" attr(data-host) "] $";
        }

        /* Prompt for root */
        .command-line-prompt > span[data-user="root"]:before {
          content: "[" attr(data-user) "@" attr(data-host) "] #";
        }

        .command-line-prompt > span[data-prompt]:before {
          content: attr(data-prompt);
        }`,
      ]}
    />
  )
}

export default GlobalStyles
