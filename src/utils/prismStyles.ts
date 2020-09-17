import { CSSObject } from '@emotion/core'
import { transparentize, margin } from 'polished'
import theme from '@theme'

// Add styles for highlight line and adjust styles for Gatsby specific markup
const highlightStyles: CSSObject = {
  '.gatsby-highlight-code-line': {
    display: 'block',
    backgroundColor: transparentize(theme.prism.highlight.transparency, theme.colors.light),
    ...margin(null, `-${theme.prism.prePadding.basic}`),
    paddingRight: theme.prism.prePadding.basic,
    paddingLeft: parseFloat(theme.prism.prePadding.basic) - parseFloat(theme.prism.highlight.border),
    borderLeft: `${theme.prism.highlight.border} solid ${theme.colors.light}`,
  },
  '.gatsby-highlight': {
    position: 'relative',
    backgroundColor: theme.colors.primary,
    fontSize: theme.prism.fontSize,
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
}

// Override some theme styles
const themeStyles: CSSObject = {
  'code[class*="language-"], pre[class*="language-"]': {
    fontFamily: theme.typography.stacks.monospace.join(', '),
  },
  ':not(pre) > code[class*="language-"]': {
    padding: `${theme.prism.codePadding.vertical} ${theme.prism.codePadding.horizontal}`,
    borderRadius: 0,
  },
}

// Add styles for bash code blocks
const commandLineStyles: CSSObject = {
  '.command-line-prompt': {
    borderRight: `${theme.prism.commandLine.border} solid ${theme.colors.light}`,
    marginRight: theme.prism.commandLine.padding,
  },
  '.command-line-prompt > span::before': {
    color: theme.colors.light,
    paddingRight: theme.prism.commandLine.padding,
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
    right: theme.prism.prePadding.basic,
    fontSize: '0.75em',
    color: theme.colors.secondary,
    border: `${theme.prism.language.border} solid ${theme.colors.secondary}`,
    borderTop: 'none',
    padding: `0 ${theme.prism.language.padding}`,
    textTransform: 'uppercase',
  },
}

const prismStyles: CSSObject[] = [highlightStyles, themeStyles, commandLineStyles, languageStyles]

export default prismStyles
