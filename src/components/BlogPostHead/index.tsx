import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'
import { transparentize } from 'polished'
import { BsCalendar, BsClock } from 'react-icons/bs'

const HeadContainer = styled.section(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  position: 'relative',
  height: !isPreview ? theme.sizes.headHeight : theme.sizes.previewHeight,
}))

const Wrapper = styled.div(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  ...singleGridCell,
  height: '100%',
  clipPath: `polygon(0 0, 100% ${!isPreview ? theme.sizes.clipSize : '0%'}, 100% 100%, 0 calc(100% - ${
    theme.sizes.clipSize
  }))`,
}))

const Title = styled.h1(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  ...(!isPreview ? theme.typography.styles.h1 : theme.typography.styles.h5),
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
  position: 'absolute',
  bottom: 0,
  left: '50%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gridGap: '1rem',
  padding: '0.5rem',
  backgroundColor: theme.colors.primary,
  color: theme.colors.secondary,
  boxShadow: theme.shadows.meta,
  transform: `translate(-50%, calc(${theme.sizes.clipSize} - 50%))`,
}))

const MetaItem = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gridGap: '0.5rem',
  alignItems: 'center',
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
  const Time = MetaItem.withComponent('time')
  return (
    <HeadContainer isPreview={isPreview} {...props}>
      <Wrapper isPreview={isPreview}>
        <Img fluid={thumbnail} alt={`Превью для статьи ${name}`} />
        <BlogPostTitle isPreview={isPreview}>{name}</BlogPostTitle>
      </Wrapper>
      <Meta>
        <Time dateTime={publishDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
          <BsCalendar title="Дата публикации" />
          {publishDate}
        </Time>
        <MetaItem>
          <BsClock title="Приблизительное время чтения" />
          {timeToRead}&nbsp;мин.
        </MetaItem>
      </Meta>
    </HeadContainer>
  )
}

export default BlogPostHead
