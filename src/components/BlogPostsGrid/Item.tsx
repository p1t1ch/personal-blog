import React from 'react'
import { Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import { transitions } from 'polished'
import { ThemeProps } from '@theme'
import BlogPostHead from '../BlogPostHead'

const BlogPostLink = styled(Link)(({ theme }: ThemeProps) => ({
  display: 'block',
  backgroundColor: theme.colors.secondary,
  color: theme.colors.primary,
  boxShadow: theme.shadows.preview,
  filter: 'grayscale(1)',
  ...transitions(['filter', 'transform'], theme.transitions.out),
  transition: 'all 400ms ease',
  ':hover, :focus': {
    filter: 'grayscale(0)',
    transform: 'translateY(-0.5rem)',
    '@media (prefers-reduced-motion)': {
      transform: 'none',
    },
    ...transitions(['filter', 'transform'], theme.transitions.in),
  },
}))

const Description = styled.p(({ theme }: ThemeProps) => ({
  padding: theme.sizes.pagePadding,
}))

export interface BlogPostsGridItemProps {
  /** Page path */
  slug: string
  /** Article title */
  name: string
  /** Article short description */
  description: string
  /** Article preview image */
  thumbnail: FluidObject
  /** Date of article publication in DD.MM.YYYY format */
  publishDate: string
  /** Calculated minutes to read based on article size */
  timeToRead: number
}

const BlogPostsGridItem = ({
  slug,
  name,
  description,
  thumbnail,
  publishDate,
  timeToRead,
  ...props
}: BlogPostsGridItemProps) => {
  return (
    <article {...props}>
      <BlogPostLink to={slug}>
        <BlogPostHead thumbnail={thumbnail} name={name} publishDate={publishDate} timeToRead={timeToRead} isPreview />
        <Description>{description}</Description>
      </BlogPostLink>
    </article>
  )
}

export default BlogPostsGridItem
