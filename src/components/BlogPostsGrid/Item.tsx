import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import { transitions, transparentize } from 'polished'
import { ThemeProps } from '@theme'
import singleGridCell from '@/utils/singleGridCell'

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

const Wrapper = styled.div(({ theme }: ThemeProps) => ({
  ...singleGridCell,
  height: '18rem',
  clipPath: `polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
}))

const Title = styled.h3(({ theme }: ThemeProps) => ({
  padding: `2rem ${theme.sizes.pagePadding} ${2 + parseFloat(theme.sizes.clipSize)}rem`,
  color: theme.colors.secondary,
  textShadow: theme.shadows.title,
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  backgroundColor: transparentize(0.5, theme.colors.primary),
  zIndex: 1,
}))

const Meta = styled.div(({ theme }: ThemeProps) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gridGap: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: theme.colors.primary,
  color: theme.colors.secondary,
  border: `2px solid ${theme.colors.secondary}`,
  zIndex: 1,
  alignSelf: 'end',
  justifySelf: 'center',
  transform: 'translateY(calc(50% - 1rem)) rotate(2deg)',
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
  image: FluidObject
  /** Date of article publication in DD.MM.YYYY format */
  publishDate: string
  /** Calculated minutes to read based on article size */
  timeToRead: number
}

const BlogPostsGridItem = ({
  slug,
  name,
  description,
  image,
  publishDate,
  timeToRead,
  ...props
}: BlogPostsGridItemProps) => {
  return (
    <article {...props}>
      <BlogPostLink to={slug}>
        <Wrapper>
          <Img fluid={image} alt={`Превью для статьи ${name}`} />
          <Title>{name}</Title>
        </Wrapper>
        {/* <Meta>
          <time aria-label="Дата выхода" dateTime={publishDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
            {publishDate}
          </time>
          <div aria-label="Примерное время чтения">{timeToRead} мин.</div>
        </Meta> */}
        <Description>{description}</Description>
      </BlogPostLink>
    </article>
  )
}

export default BlogPostsGridItem
