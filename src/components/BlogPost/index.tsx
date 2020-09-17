import React from 'react'
import { FluidObject } from 'gatsby-image'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { margin, padding } from 'polished'
import ArticleHead from '@/components/ArticleHead'
import Container from '@/components/Container'

interface BlogPostProps {
  /** HTML content */
  content: string
  /** Blog post name */
  title: string
  /** Featured image */
  thumbnail: FluidObject
  /** Publish date in DD/MM/YYYY format */
  publishDate: string
  /** Time to read in minutes */
  timeToRead: number
}

const BlogPost = ({ content, title, thumbnail, publishDate, timeToRead }: BlogPostProps) => {
  const theme = useTheme<Theme>()

  return (
    <article>
      <ArticleHead image={thumbnail} name={title} publishDate={publishDate} timeToRead={timeToRead} />
      <Container isBlogPost>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          css={{
            h2: theme.typography.styles.h2,
            h3: theme.typography.styles.h3,
            h4: theme.typography.styles.h4,
            h5: theme.typography.styles.h5,
            h6: theme.typography.styles.h6,
            'h2, h3, h4, h5, h6, p, blockquote, ul, ol, li:not(:last-child), figure, .gatsby-highlight, .gatsby-resp-iframe-wrapper, :not(.gatsby-resp-iframe-wrapper) > iframe': {
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
            '.gatsby-highlight, .gatsby-resp-iframe-wrapper, :not(.gatsby-resp-iframe-wrapper) > iframe': {
              ...margin(null, `-${theme.sizes.pagePadding}`),
            },
            ':not(.gatsby-resp-iframe-wrapper) > iframe': {
              width: `calc(100% + ${theme.sizes.pagePadding} + ${theme.sizes.pagePadding})`,
            },
            '.anchor.before': {
              top: '50%',
              transform: 'translate(-100%, -50%)',
              ...padding(null, theme.sizes.anchorPadding),
              ':focus': {
                outlineOffset: `-${parseFloat(theme.sizes.anchorPadding) / 2}rem`,
              },
              svg: {
                display: 'block',
                width: `${parseFloat(theme.sizes.pagePadding) - parseFloat(theme.sizes.anchorPadding) * 2}rem`,
                height: `${parseFloat(theme.sizes.pagePadding) - parseFloat(theme.sizes.anchorPadding) * 2}rem`,
              },
            },
          }}
        />
      </Container>
    </article>
  )
}

export default BlogPost
