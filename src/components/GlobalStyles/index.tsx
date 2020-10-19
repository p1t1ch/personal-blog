import React from 'react'
import 'focus-visible'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { buttons, transitions, normalize, margin, transparentize } from 'polished'
import { Theme } from '@theme'
import colorVar from '@/utils/colorVar'
import '@/fonts/index.css'

// TODO Remove root style

const GlobalStyles = () => {
  const theme = useTheme<Theme>()

  return (
    <Global
      styles={[
        ...normalize(),
        {
          ':root': {
            '--initial-color-scheme': 'light',
            '--color-primary': theme.colors.black,
            '--color-secondary': theme.colors.white,
            '--color-active': theme.colors.darkPurple,
          },
        },
        {
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
          '::selection': {
            backgroundColor: colorVar('primary'),
            color: colorVar('secondary'),
          },
          html: {
            fontFamily: [theme.typography.family, ...theme.typography.stacks.sansSerif].join(', '),
            scrollBehavior: 'smooth',
            '@media (prefers-reduced-motion)': {
              scrollBehavior: 'auto',
            },
          },
          body: {
            ...theme.typography.styles.body,
            backgroundColor: colorVar('secondary'),
            color: colorVar('primary'),
            ...transitions(['background-color', 'color'], theme.transitions.long),
          },
          'h1, h2, h3, h4, h5, h6, p, ol, ul, dl, dd, hr, blockquote, figure': {
            margin: 0,
            padding: 0,
          },
          '.js-focus-visible :focus:not(.focus-visible)': {
            outline: 'none',
          },
          ':focus': {
            outline: `0.25rem solid ${colorVar('active')}`,
            outlineOffset: '0.125rem',
          },
          [buttons()]: {
            border: 'none',
            padding: 0,
            background: 'none',
            cursor: 'pointer',
            color: colorVar('primary'),
            ...transitions(['color', 'background-color'], theme.transitions.long),
            ':hover': {
              ...transitions(['color', 'background-color'], theme.transitions.short),
            },
          },
          a: {
            textDecoration: 'none',
            color: colorVar('primary'),
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
            backgroundColor: transparentize(theme.prism.highlight.transparency, theme.colors.yellow),
            ...margin(null, `-${theme.prism.prePadding.basic}`),
            paddingRight: theme.prism.prePadding.basic,
            paddingLeft: `${parseFloat(theme.prism.prePadding.basic) - parseFloat(theme.prism.highlight.border)}em`,
            borderLeft: `${theme.prism.highlight.border} solid ${theme.colors.yellow}`,
          },
          '.gatsby-highlight': {
            position: 'relative',
            backgroundColor: theme.colors.black,
            boxShadow: `inset 0 0 0 ${theme.sizes.linesWidth} ${colorVar('primary')}`,
            fontSize: theme.prism.fontSize,
            ...transitions(['box-shadow'], theme.transitions.long),
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
            backgroundColor: colorVar('primary'),
            color: colorVar('secondary'),
            ...transitions(['background-color', 'color'], theme.transitions.long),
          },
          // Add styles for bash code blocks
          '.command-line-prompt': {
            borderRight: `${theme.prism.commandLine.border} solid ${theme.colors.yellow}`,
            marginRight: theme.prism.commandLine.padding,
          },
          '.command-line-prompt > span::before': {
            color: theme.colors.yellow,
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
            color: theme.colors.white,
            textTransform: 'uppercase',
          },
        },
      ]}
    />
  )
}

export default GlobalStyles
