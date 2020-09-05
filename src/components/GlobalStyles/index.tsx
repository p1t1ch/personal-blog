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
      ]}
    />
  )
}

export default GlobalStyles
