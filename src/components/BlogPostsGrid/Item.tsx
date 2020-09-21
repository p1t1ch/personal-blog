import React from 'react'
import { Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import { transitions } from 'polished'
import { ThemeProps } from '@theme'
import BlogPostHead from '../BlogPostHead'

const BlogPostLink = styled(Link)(({ theme }: ThemeProps) => ({
  position: 'relative',
  display: 'block',
  backgroundColor: theme.colors.dynamic.primary,
  color: theme.colors.dynamic.primary,
  filter: 'grayscale(1)',
  ...transitions(['filter', 'transform', 'background-color', 'color'], theme.transitions.long),
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
  padding: `3rem 1rem 1rem`,
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 100%)`,
  marginTop: `calc(-${theme.sizes.clipSize} + ${theme.sizes.headOffset})`,
  backgroundColor: theme.colors.dynamic.secondary,
  border: `0.25rem solid ${theme.colors.dynamic.primary}`,
  borderTop: 'none',
  ...transitions(['background-color', 'border-color'], theme.transitions.long),
}))

export interface BlogPostsGridItemProps {
  /** Page path */
  slug: string
  /** Article title */
  title: string
  /** Article preview image */
  thumbnail: FluidObject
  /** Date of article publication in DD.MM.YYYY format */
  publishDate: string
  /** Calculated minutes to read based on article size */
  timeToRead: number
  /** Article short description */
  description: string
}

export const BlogPostsGridItem = ({
  slug,
  title,
  thumbnail,
  publishDate,
  timeToRead,
  description,
  ...props
}: BlogPostsGridItemProps) => {
  return (
    <article {...props}>
      <BlogPostLink to={slug}>
        <BlogPostHead thumbnail={thumbnail} title={title} publishDate={publishDate} timeToRead={timeToRead} isPreview />
        <Description>{description}</Description>
      </BlogPostLink>
    </article>
  )
}

export default BlogPostsGridItem
