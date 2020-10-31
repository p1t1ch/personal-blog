import React from 'react'
import { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import { margin, size } from 'polished'
import BlogPostHead from '@/components/BlogPostHead'
import Container from '@/components/Container'
import colorVar from '@/utils/colorVar'

const Content = styled(Container)(({ theme }: ThemeProps) => ({
  h2: theme.typography.styles.h2,
  h3: theme.typography.styles.h3,
  'h4, h5, h6': theme.typography.styles.h4,
  'h2, h3, h4, h5, h6': {
    ...margin('2rem', null),
  },
  'p, blockquote, ul, ol, figure, .gatsby-highlight, .gatsby-resp-iframe-wrapper, :not(.gatsby-resp-iframe-wrapper) > iframe, video': {
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
      border: `0.125rem solid ${colorVar('primary')}`,
    },
  },
  blockquote: {
    display: 'grid',
    gridGap: '0.5rem',
    borderLeft: `0.5rem solid ${colorVar('primary')}`,
    padding: '0.5rem 1rem',
    paddingRight: 0,
    '> *': { marginBottom: 0 },
  },
  hr: {
    border: `2px solid ${colorVar('primary')}`,
    ...margin('2rem', null),
  },
  a: {
    textDecoration: 'underline',
    ':hover': {
      color: colorVar('active'),
    },
  },
  '.gatsby-highlight, .gatsby-resp-iframe-wrapper, .gatsby-resp-image-figure, video': {
    ...margin(null, `-${theme.sizes.pagePadding}`),
  },
  '.gatsby-resp-image-figcaption': {
    padding: `0.5rem ${theme.sizes.pagePadding} 0`,
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
  marginBottom: '2rem !important',
  em: theme.typography.styles.small,
}))

interface BlogPostProps {
  /** Blog post name */
  title: string
  /** Featured image */
  thumbnail: FluidObject
  /** Date of blog post publication in human readable format */
  publishDate: string
  /** Date of blog post publication in valid format for time tag */
  publishDateStrict: string
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
  publishDateStrict,
  timeToRead,
  unsplashLink,
  unsplashAuthor,
  description,
  content,
}: BlogPostProps) => {
  return (
    <article>
      <BlogPostHead
        thumbnail={thumbnail}
        title={title}
        publishDate={publishDate}
        publishDateStrict={publishDateStrict}
        timeToRead={timeToRead}
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
