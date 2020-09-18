import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'
import { transparentize } from 'polished'

const HeadContainer = styled.section(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  ...singleGridCell,
  height: !isPreview ? theme.sizes.headHeight : theme.sizes.previewHeight,
  clipPath: `polygon(0 0, 100% ${!isPreview ? theme.sizes.clipSize : '0%'}, 100% 100%, 0 calc(100% - ${
    theme.sizes.clipSize
  }))`,
}))

const Title = styled.h1(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  ...(!isPreview ? theme.typography.styles.h1 : theme.typography.styles.h4),
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

export interface BlogPostHeadProps {
  /** Use inside blog post preview */
  isPreview?: boolean
  /** Article title */
  name: string
  /** Article preview image */
  thumbnail: FluidObject
  /** Date of article publication in DD.MM.YYYY format */
  publishDate: string
  /** Calculated minutes to read based on article size */
  timeToRead: number
}

const BlogPostHead = ({ isPreview = false, name, thumbnail, publishDate, timeToRead, ...props }: BlogPostHeadProps) => {
  const BlogPostTitle = !isPreview ? Title : Title.withComponent('h3')
  return (
    <HeadContainer isPreview={isPreview} {...props}>
      <Img fluid={thumbnail} alt={`Превью для статьи ${name}`} />
      <BlogPostTitle isPreview={isPreview}>{name}</BlogPostTitle>
      {/* <Meta>
        <time aria-label="Дата выхода" dateTime={publishDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
          {publishDate}
        </time>
        <div aria-label="Примерное время чтения">
          {timeToRead} мин.
        </div>
      </Meta> */}
    </HeadContainer>
  )
}

export default BlogPostHead
