import React from 'react'
import 'focus-visible'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { buttons, transitions, normalize } from 'polished'
import Commissioner from '@/fonts/Commissioner.woff2'
import { Theme } from '@theme'
import prismStyles from '@/utils/prismStyles'

const GlobalStyles = () => {
  const theme = useTheme<Theme>()

  return (
    <Global
      styles={[
        ...normalize(),
        {
          '@font-face': {
            fontFamily: 'Commissioner',
            src: `url(${Commissioner}) format('woff2-variations')`,
            fontDisplay: 'swap',
            fontWeight: '100 900' as any,
          },
        },
        prismStyles,
        {
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
          html: {
            fontFamily: [theme.typography.family, ...theme.typography.stacks.sansSerif].join(', '),
            fontFeatureSettings: '"frac"',
            scrollBehavior: 'smooth',
            '@media (prefers-reduced-motion)': {
              scrollBehavior: 'auto',
            },
          },
          body: {
            ...theme.typography.styles.body,
            backgroundColor: theme.colors.primary,
            color: theme.colors.primary,
          },
          'h1, h2, h3, h4, h5, h6, p, ol, ul, dl, dd, hr': {
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
            padding: 0,
            background: 'none',
            cursor: 'pointer',
            ...transitions(['color', 'background-color'], theme.transitions.in),
          },
          a: {
            textDecoration: 'none',
            color: theme.colors.primary,
            ...transitions(['color'], theme.transitions.in),
          },
          'h1, h2, h3, h4, h5, h6': {
            fontVariationSettings: '"FLAR" 100, "VOLM" 100',
          },
          strong: {
            fontWeight: 700,
          },
          em: {
            fontVariationSettings: '"slnt" -12',
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
          figure: {
            margin: 0,
          },
        },
      ]}
    />
  )
}

export default GlobalStyles
