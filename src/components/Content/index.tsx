import React from 'react'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { margin } from 'polished'

interface ContentProps {
  /** Article content */
  content: string
}

// TODO Move container width and paddings to theme

const Content = ({ content }: ContentProps) => {
  const theme = useTheme<Theme>()

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      css={{
        h2: theme.typography.styles.h2,
        h3: theme.typography.styles.h3,
        h4: theme.typography.styles.h4,
        h5: theme.typography.styles.h5,
        h6: theme.typography.styles.h6,
        'h2, h3, h4, h5, h6, p, blockquote, ul, ol, li:not(:last-child), .gatsby-highlight, .gatsby-resp-iframe-wrapper, :not(.gatsby-resp-iframe-wrapper) > iframe': {
          marginBottom: '1rem',
        },
        blockquote: {
          borderLeft: `1rem solid ${theme.colors.primary}`,
          paddingLeft: '1rem',
        },
        hr: {
          border: `2px solid ${theme.colors.primary}`,
          ...margin('2rem', null),
        },
        a: {
          textDecoration: 'underline',
          ':hover': {
            color: theme.colors.active,
          },
        },
        '.gatsby-highlight': {
          ...margin(null, '-1.5rem'),
        },
      }}
    />
  )
}

export default Content
