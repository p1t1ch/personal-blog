import { CSSObject } from '@emotion/core'
import { transparentize, margin } from 'polished'
import theme from '@theme'

// Add styles for highlight line and adjust styles for Gatsby specific markup
const highlightStyles: CSSObject = {
  '.gatsby-highlight-code-line': {
    display: 'block',
    backgroundColor: transparentize(theme.prism.highlight.transparency, theme.colors.light),
    ...margin(null, `-${theme.prism.prePadding.basic}em`),
    paddingRight: `${theme.prism.prePadding.basic}em`,
    paddingLeft: `calc(${theme.prism.prePadding.basic}em - ${theme.prism.highlight.border}em)`,
    borderLeft: `${theme.prism.highlight.border}em solid ${theme.colors.light}`,
  },
  '.gatsby-highlight': {
    position: 'relative',
    backgroundColor: theme.colors.primary,
  },
  '.gatsby-highlight pre[class*="language-"]': {
    backgroundColor: 'transparent',
    margin: 0,
    padding: `${theme.prism.prePadding.basic}em`,
    paddingTop: `${theme.prism.prePadding.top}em`,
    borderRadius: 0,
  },
  '.gatsby-highlight pre code': {
    float: 'left',
    minWidth: '100%',
  },
}

// Override some theme styles
const themeStyles: CSSObject = {
  'code[class*="language-"], pre[class*="language-"]': {
    fontFamily: theme.typography.stacks.monospace.join(', '),
  },
  ':not(pre) > code[class*="language-"]': {
    padding: `${theme.prism.codePadding.vertical}em ${theme.prism.codePadding.horizontal}em`,
    borderRadius: 0,
  },
}

// Add styles for bash code blocks
const commandLineStyles: CSSObject = {
  '.command-line-prompt': {
    borderRight: `${theme.prism.commandLine.border}em solid ${theme.colors.light}`,
    marginRight: `${theme.prism.commandLine.padding}em`,
  },
  '.command-line-prompt > span::before': {
    color: theme.colors.light,
    paddingRight: `${theme.prism.commandLine.padding}em`,
  },
  '.command-line-prompt > span[data-user]::before': {
    content: '"$"',
  },
}

// Add language mark
const languageStyles: CSSObject = {
  '[data-language]::after': {
    content: '""attr(data-language)""',
    position: 'absolute',
    top: 0,
    right: `${theme.prism.prePadding.basic}em`,
    fontSize: '0.75em',
    color: theme.colors.secondary,
    border: `${theme.prism.language.border}em solid ${theme.colors.secondary}`,
    borderTop: 'none',
    padding: `0 ${theme.prism.language.padding}em`,
    textTransform: 'uppercase',
  },
}

const prismStyles: CSSObject[] = [highlightStyles, themeStyles, commandLineStyles, languageStyles]

export default prismStyles
