import React from 'react'
import { FluidObject } from 'gatsby-image'
import { Theme, ThemeProps } from '@theme'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import { margin, size, transitions } from 'polished'
import BlogPostHead from '@/components/BlogPostHead'
import Container from '@/components/Container'

const Content = styled(Container)(({ theme }: ThemeProps) => ({
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
      border: `0.125rem solid ${theme.colors.dynamic.primary}`,
      ...transitions(['border-color'], theme.transitions.long),
    },
  },
  blockquote: {
    display: 'grid',
    gridGap: '0.5rem',
    borderLeft: `0.5rem solid ${theme.colors.dynamic.primary}`,
    padding: '0.5rem 1rem',
    paddingRight: 0,
    ...transitions(['border-color'], theme.transitions.long),
    '> *': { marginBottom: 0 },
  },
  hr: {
    border: `2px solid ${theme.colors.dynamic.primary}`,
    ...margin('2rem', null),
    ...transitions(['border-color'], theme.transitions.long),
  },
  a: {
    textDecoration: 'underline',
    ':hover': {
      color: theme.colors.dynamic.active,
    },
  },
  '.gatsby-highlight, .gatsby-resp-iframe-wrapper, .gatsby-resp-image-figure': {
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
}))

const Tldr = styled.blockquote(({ theme }: ThemeProps) => ({
  marginBottom: '2rem',
  em: theme.typography.styles.small,
}))

interface BlogPostProps {
  /** Blog post name */
  title: string
  /** Featured image */
  thumbnail: FluidObject
  /** Publish date in DD/MM/YYYY format */
  publishDate: string
  /** Time to read in minutes */
  timeToRead: number
  /** Link to Unsplash author page */
  unsplashLink: string
  /** Unsplash author name */
  unsplashAuthor: string
  /** Blog post description */
  description: string
  /** HTML content */
  content: string
}

const BlogPost = ({
  title,
  thumbnail,
  publishDate,
  timeToRead,
  unsplashLink,
  unsplashAuthor,
  description,
  content,
}: BlogPostProps) => {
  const theme = useTheme<Theme>()

  return (
    <article css={{ position: 'relative' }}>
      <BlogPostHead
        thumbnail={thumbnail}
        title={title}
        publishDate={publishDate}
        timeToRead={timeToRead}
        css={{ marginTop: `calc(-${theme.sizes.clipSize} + ${theme.sizes.headOffset})` }}
      />
      <Content isBlogPost>
        <Tldr>
          <em>
            Фото от{' '}
            <a href={unsplashLink} target="_blank" rel="nofollow noopener noreferrer">
              {unsplashAuthor}
            </a>
          </em>
          <p>{description}</p>
        </Tldr>
        <div dangerouslySetInnerHTML={{ __html: content }} css={{ '> :last-child': { marginBottom: 0 } }} />
      </Content>
    </article>
  )
}

export default BlogPost
