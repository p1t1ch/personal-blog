import React from 'react'
import { Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import { transitions } from 'polished'
import { ThemeProps } from '@theme'
import BlogPostHead from '../BlogPostHead'

const Article = styled.article(() => ({
  height: '100%',
}))

const BlogPostLink = styled(Link)(({ theme }: ThemeProps) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.colors.dynamic.primary,
  filter: 'grayscale(1)',
  ...transitions(['filter', 'transform', 'background-color'], theme.transitions.long),
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
  padding: '3.5rem 1.5rem 1.5rem',
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 100%)`,
  marginTop: `calc(-${theme.sizes.clipSize} + ${theme.sizes.linesWidth})`,
  backgroundColor: theme.colors.dynamic.secondary,
  border: `${theme.sizes.linesWidth} solid ${theme.colors.dynamic.primary}`,
  borderTop: 'none',
  ...transitions(['background-color', 'border-color', 'color'], theme.transitions.long),
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
  /** Difference in hours between now and date of blog post publication */
  differenceInHours: number
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
  differenceInHours,
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
          differenceInHours={differenceInHours}
          timeToRead={timeToRead}
          isPreview
        />
        <Description>{description}</Description>
      </BlogPostLink>
    </Article>
  )
}

export default BlogPostsGridItem
