import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'
import { transitions, transparentize } from 'polished'
import { BsCalendar, BsClock } from 'react-icons/bs'

const HeadContainer = styled.section(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  height: !isPreview ? theme.sizes.headHeight : theme.sizes.previewHeight,
  backgroundColor: !isPreview ? theme.colors.static.white : theme.colors.dynamic.primary,
  ...transitions(['background-color'], theme.transitions.long),
}))

const Wrapper = styled.div(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  ...singleGridCell,
  height: '100%',
  clipPath: `polygon(0 0, 100% ${!isPreview ? theme.sizes.clipSize : '0%'}, 100% 100%, 0 calc(100% - ${
    theme.sizes.clipSize
  }))`,
}))

const TitleWrapper = styled.div(({ theme }: ThemeProps) => ({
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  backgroundColor: transparentize(0.5, theme.colors.static.black),
  zIndex: 1,
}))

const Title = styled.h1(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  ...(!isPreview ? theme.typography.styles.h1 : theme.typography.styles.h5),
  maxWidth: theme.sizes.mainContainerWidth,
  padding: `2rem ${theme.sizes.pagePadding} ${2 + parseFloat(theme.sizes.clipSize)}rem`,
  color: theme.colors.static.white,
  textShadow: `0.075em 0.075em 0 ${theme.colors.static.black}`,
}))

const Meta = styled.section(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  position: 'absolute',
  zIndex: 1,
  top: `${
    parseFloat(!isPreview ? theme.sizes.headHeight : theme.sizes.previewHeight) - parseFloat(theme.sizes.clipSize)
  }rem`,
  left: '50%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gridGap: '1rem',
  padding: '0.5rem',
  backgroundColor: theme.colors.static.black,
  color: theme.colors.static.white,
  boxShadow: `0 0 0 0.125rem ${theme.colors.static.white}`,
  transform: 'translate(-50%, -0.75rem)',
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
    <>
      <HeadContainer isPreview={isPreview} {...props}>
        <Wrapper isPreview={isPreview}>
          <Img
            fluid={thumbnail}
            alt={`Превью для статьи ${name}`}
            imgStyle={!isPreview ? { position: 'fixed', objectPosition: '50% 100%' } : {}}
          />
          <TitleWrapper>
            <BlogPostTitle isPreview={isPreview}>{name}</BlogPostTitle>
          </TitleWrapper>
        </Wrapper>
      </HeadContainer>
      <Meta isPreview={isPreview}>
        <Time dateTime={publishDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
          <BsCalendar title="Дата публикации" />
          {publishDate}
        </Time>
        <MetaItem>
          <BsClock title="Приблизительное время чтения" />
          {timeToRead}&nbsp;мин.
        </MetaItem>
      </Meta>
    </>
  )
}

export default BlogPostHead
