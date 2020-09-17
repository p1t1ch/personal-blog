import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'

const PreviewContainer = styled.article(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.secondary,
  color: theme.colors.primary,
  boxShadow: theme.shadows.preview,
  transition: 'transform 400ms ease',
  ':hover': {
    transform: 'translateY(-1rem)',
    transition: 'transform 200ms ease',
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
  justifySelf: 'center',
  textAlign: 'center',
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
    <PreviewContainer {...props}>
      <Link
        to={slug}
        css={{
          display: 'block',
          img: {
            filter: 'grayscale(1)',
            transition: '400ms all ease !important',
          },
          ':hover img': {
            filter: 'grayscale(0)',
            // transform: 'scale(1.05) translate(-1rem, -1rem)',
            transition: '200ms all ease !important',
          },
        }}
      >
        <Wrapper>
          <Img fluid={image} alt={`Превью для статьи ${name}`} css={{ alignSelf: 'stretch' }} />
          <Title>{name}</Title>
        </Wrapper>
        {/* <Meta>
          <time aria-label="Дата выхода" dateTime={publishDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
            {publishDate}
          </time>
          <div aria-label="Примерное время чтения">{timeToRead} мин.</div>
        </Meta> */}
        <Description>{description}</Description>
      </Link>
    </PreviewContainer>
  )
}

export default BlogPostsGridItem
