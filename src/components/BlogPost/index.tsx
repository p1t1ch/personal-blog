import React from 'react'
import { FluidObject } from 'gatsby-image'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { margin, padding, size } from 'polished'
import BlogPostHead from '@/components/BlogPostHead'
import Container from '@/components/Container'

interface BlogPostProps {
  /** HTML content */
  content: string
  /** Blog post name */
  title: string
  /** Blog post description */
  description: string
  /** Featured image */
  thumbnail: FluidObject
  /** Link to Unsplash author page */
  unsplashLink: string
  /** Unsplash author name */
  unsplashAuthor: string
  /** Publish date in DD/MM/YYYY format */
  publishDate: string
  /** Time to read in minutes */
  timeToRead: number
}

const BlogPost = ({
  content,
  title,
  description,
  thumbnail,
  unsplashLink,
  unsplashAuthor,
  publishDate,
  timeToRead,
}: BlogPostProps) => {
  const theme = useTheme<Theme>()

  return (
    <article>
      <BlogPostHead
        thumbnail={thumbnail}
        name={title}
        publishDate={publishDate}
        timeToRead={timeToRead}
        css={{ marginTop: `calc(-${theme.sizes.clipSize} + ${theme.sizes.headOffset})` }}
      />
      <Container
        isBlogPost
        css={{
          h2: theme.typography.styles.h2,
          h3: theme.typography.styles.h3,
          h4: theme.typography.styles.h4,
          h5: theme.typography.styles.h5,
          h6: theme.typography.styles.h6,
          'h2, h3, h4, h5, h6, p, blockquote, ul, ol, figure, .gatsby-highlight, .gatsby-resp-iframe-wrapper, :not(.gatsby-resp-iframe-wrapper) > iframe': {
            marginBottom: '1rem',
          },
          'li:not(:last-child)': {
            marginBottom: '0.5rem',
          },
          'ul > li': {
            listStyleType: 'square',
            listStylePosition: 'inside',
          },
          ol: {
            counterReset: 'orderedlist',
            '> li::before': {
              counterIncrement: 'orderedlist',
              content: 'counter(orderedlist)',
              padding: '0 0.25rem',
              marginRight: '1rem',
              border: `0.125rem solid ${theme.colors.primary}`,
            },
          },
          blockquote: {
            display: 'grid',
            gridGap: '0.5rem',
            borderLeft: `0.5rem solid ${theme.colors.primary}`,
            padding: '0.5rem 1rem',
            paddingRight: 0,
            '> :last-child': { marginBottom: 0 },
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
          '.gatsby-highlight, .gatsby-resp-iframe-wrapper': {
            ...margin(null, `-${theme.sizes.pagePadding}`),
          },
          '.gatsby-resp-image-figcaption': {
            paddingTop: '0.5rem',
            textAlign: 'center',
            ...theme.typography.styles.small,
            fontVariationSettings: '"slnt" -12',
          },
          '.anchor.after': {
            paddingLeft: 0,
            marginLeft: '0.25em',
            verticalAlign: 'middle',
            svg: {
              display: 'block',
              ...size('0.75em'),
            },
          },
        }}
      >
        <blockquote css={{ marginBottom: '2rem' }}>
          <em css={{ ...theme.typography.styles.small }}>
            Респект за фото{' '}
            <a href={unsplashLink} target="_blank" rel="nofollow noopener noreferrer">
              {unsplashAuthor}
            </a>
          </em>
          <p>{description}</p>
        </blockquote>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          css={{
            '> :last-child': { marginBottom: 0 },
          }}
        />
      </Container>
    </article>
  )
}

export default BlogPost
