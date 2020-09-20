import React from 'react'
import { FluidObject } from 'gatsby-image'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { margin, padding } from 'polished'
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
          'h2, h3, h4, h5, h6, p, blockquote, ul, ol, li:not(:last-child), figure, .gatsby-highlight, .gatsby-resp-iframe-wrapper, :not(.gatsby-resp-iframe-wrapper) > iframe': {
            marginBottom: '1rem',
          },
          blockquote: {
            borderLeft: `0.5rem solid ${theme.colors.primary}`,
            padding: '1rem',
            paddingRight: 0,
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
      >
        <blockquote
          css={{
            display: 'grid',
            gridGap: '0.5rem',
            marginBottom: '2rem',
            '> :last-child': { marginBottom: 0 },
          }}
        >
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
