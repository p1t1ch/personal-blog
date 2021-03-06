import React from 'react'
import { Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import { transitions } from 'polished'
import { ThemeProps } from '@theme'
import BlogPostHead from '@/components/BlogPostHead'
import colorVar from '@/utils/colorVar'

const Article = styled.article(() => ({
  height: '100%',
}))

const BlogPostLink = styled(Link)(({ theme }: ThemeProps) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  filter: 'grayscale(1)',
  ...transitions(['filter', 'transform'], theme.transitions.long),
  ':hover, :focus': {
    filter: 'grayscale(0)',
    transform: 'translateY(-0.5rem)',
    '@media (prefers-reduced-motion)': {
      transform: 'none',
    },
    ...transitions(['filter', 'transform'], theme.transitions.short),
  },
}))

const Description = styled.section(({ theme }: ThemeProps) => ({
  flexGrow: 1,
  padding: '1.5rem',
  paddingTop: `calc(${theme.sizes.clipSize} + 1.5rem)`,
  marginTop: `-${theme.sizes.clipSize}`,
  border: `${theme.sizes.linesWidth} solid ${colorVar('primary')}`,
  borderTop: 'none',
}))

export interface BlogPostsGridItemProps {
  /** Page path */
  slug: string
  /** Blog post title */
  title: string
  /** Blog post preview image */
  thumbnail: FluidObject
  /** Date of blog post publication in human readable format */
  publishDate: string
  /** Date of blog post publication in valid format for time tag */
  publishDateStrict: string
  /** Calculated minutes to read based on blog post size */
  timeToRead: number
  /** Blog post short description */
  description: string
}

export const BlogPostsGridItem = ({
  slug,
  title,
  thumbnail,
  publishDate,
  publishDateStrict,
  timeToRead,
  description,
  ...props
}: BlogPostsGridItemProps) => {
  return (
    <Article {...props}>
      <BlogPostLink to={slug}>
        <BlogPostHead
          thumbnail={thumbnail}
          title={title}
          publishDate={publishDate}
          publishDateStrict={publishDateStrict}
          timeToRead={timeToRead}
          isPreview
        />
        <Description>{description}</Description>
      </BlogPostLink>
    </Article>
  )
}

export default BlogPostsGridItem
