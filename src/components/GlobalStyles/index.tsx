import React from 'react'
import 'focus-visible'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { buttons, transitions, normalize, margin, transparentize } from 'polished'
import { Theme } from '@theme'
import '@/fonts/index.css'

const GlobalStyles = () => {
  const theme = useTheme<Theme>()

  return (
    <Global
      styles={[
        ...normalize(),
        {
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
          '::selection': {
            backgroundColor: theme.colors.dynamic.primary,
            color: theme.colors.dynamic.secondary,
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
            backgroundColor: theme.colors.static.black,
            color: theme.colors.dynamic.primary,
            ...transitions(['color'], theme.transitions.long),
          },
          'h1, h2, h3, h4, h5, h6, p, ol, ul, dl, dd, hr, blockquote, figure': {
            margin: 0,
            padding: 0,
          },
          '.js-focus-visible :focus:not(.focus-visible)': {
            outline: 'none',
          },
          ':focus': {
            outline: `0.25rem solid ${theme.colors.dynamic.active}`,
            outlineOffset: '0.125rem',
          },
          [buttons()]: {
            border: 'none',
            padding: 0,
            background: 'none',
            cursor: 'pointer',
            ...transitions(['color', 'background-color'], theme.transitions.long),
            ':hover': {
              ...transitions(['color', 'background-color'], theme.transitions.short),
            },
          },
          a: {
            textDecoration: 'none',
            color: theme.colors.dynamic.primary,
            ...transitions(['color'], theme.transitions.long),
            ':hover': {
              ...transitions(['color'], theme.transitions.short),
            },
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
        },
        {
          // Add styles for highlight line and adjust styles for Gatsby specific markup
          '.gatsby-highlight-code-line': {
            display: 'block',
            backgroundColor: transparentize(theme.prism.highlight.transparency, theme.colors.static.yellow),
            ...margin(null, `-${theme.prism.prePadding.basic}`),
            paddingRight: theme.prism.prePadding.basic,
            paddingLeft: `${parseFloat(theme.prism.prePadding.basic) - parseFloat(theme.prism.highlight.border)}em`,
            borderLeft: `${theme.prism.highlight.border} solid ${theme.colors.static.yellow}`,
          },
          '.gatsby-highlight': {
            position: 'relative',
            backgroundColor: theme.colors.static.black,
            boxShadow: `inset 0 0 0 ${theme.sizes.linesWidth} ${theme.colors.dynamic.primary}`,
            fontSize: theme.prism.fontSize,
            ...transitions(['border-color'], theme.transitions.long),
          },
          '.gatsby-highlight pre[class*="language-"]': {
            backgroundColor: 'transparent',
            margin: 0,
            padding: theme.prism.prePadding.basic,
            paddingTop: theme.prism.prePadding.top,
            borderRadius: 0,
          },
          '.gatsby-highlight pre code': {
            float: 'left',
            minWidth: '100%',
          },
          // Override some theme styles
          'code[class*="language-"], pre[class*="language-"]': {
            fontFamily: theme.typography.stacks.monospace.join(', '),
          },
          ':not(pre) > code': {
            padding: `${theme.prism.codePadding.vertical} ${theme.prism.codePadding.horizontal}`,
            borderRadius: 0,
            backgroundColor: theme.colors.dynamic.primary,
            color: theme.colors.dynamic.secondary,
          },
          // Add styles for bash code blocks
          '.command-line-prompt': {
            borderRight: `${theme.prism.commandLine.border} solid ${theme.colors.static.yellow}`,
            marginRight: theme.prism.commandLine.padding,
          },
          '.command-line-prompt > span::before': {
            color: theme.colors.static.yellow,
            paddingRight: theme.prism.commandLine.padding,
          },
          '.command-line-prompt > span[data-user]::before': {
            content: '"$"',
          },
          // Add language mark
          '[data-language]::after': {
            content: '""attr(data-language)""',
            position: 'absolute',
            top: 0,
            right: '0.5em',
            color: theme.colors.static.white,
            textTransform: 'uppercase',
          },
        },
      ]}
    />
  )
}

export default GlobalStyles
