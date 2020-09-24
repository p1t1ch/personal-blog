import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'
import { transitions, transparentize } from 'polished'
import { BsCalendar, BsClock } from 'react-icons/bs'
import media from '@/utils/media'
import declOfNum from '@/utils/declOfNum'

const HeadContainer = styled.section(({ theme, isPreview }: ThemeProps & { isPreview: boolean }) => ({
  height: !isPreview ? theme.sizes.headHeight : theme.sizes.previewHeight,
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
  ...(!isPreview ? theme.typography.styles.h1 : theme.typography.styles.blogPostPreview),
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
  display: 'flex',
  padding: '0.5rem 1rem',
  transform: 'translateX(-50%)',
  [media.sm]: { flexDirection: 'column', transform: 'translate(-50%, -2rem)' },
  '> :not(:last-child)': {
    marginRight: '1rem',
    [media.sm]: { marginRight: 0 },
  },
  ...theme.typography.styles.meta,
  backgroundColor: theme.colors.dynamic.secondary,
  boxShadow: `0 0 0 ${theme.sizes.linesWidth} ${theme.colors.dynamic.primary}`,
  ...transitions(['background-color', 'box-shadow'], theme.transitions.long),
}))

const MetaItem = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gridGap: '1rem',
  alignItems: 'center',
  justifyContent: 'start',
  whiteSpace: 'nowrap',
}))

export interface BlogPostHeadProps {
  /** Blog post title */
  title: string
  /** Blog post preview image */
  thumbnail: FluidObject
  /** Date of blog post publication in human readable format */
  publishDate: string
  /** Date of blog post publication in valid format for time tag */
  publishDateStrict: string
  /** Difference in hours between now and date of blog post publication */
  differenceInHours?: number
  /** Calculated minutes to read based on blog post size */
  timeToRead: number
  /** Use inside blog post preview */
  isPreview?: boolean
}

const BlogPostHead = ({
  title,
  thumbnail,
  publishDate,
  publishDateStrict,
  differenceInHours,
  timeToRead,
  isPreview = false,
  ...props
}: BlogPostHeadProps) => {
  const BlogPostTitle = !isPreview ? Title : Title.withComponent('h3')
  const Time = MetaItem.withComponent('time')

  let publishDateOutput = publishDate

  if (differenceInHours !== undefined) {
    if (differenceInHours === 0) {
      publishDateOutput = 'только что'
    } else if (differenceInHours < 24) {
      publishDateOutput = `${differenceInHours} ${declOfNum(differenceInHours, ['час', 'часа', 'часов'])} назад`
    }
  }

  return (
    <>
      <HeadContainer isPreview={isPreview} {...props}>
        <Wrapper isPreview={isPreview}>
          <Img
            fluid={thumbnail}
            alt={`Превью для статьи ${title}`}
            imgStyle={!isPreview ? { position: 'fixed', objectPosition: '50% 100%' } : {}}
          />
          <TitleWrapper>
            <BlogPostTitle isPreview={isPreview}>{title}</BlogPostTitle>
          </TitleWrapper>
        </Wrapper>
      </HeadContainer>
      <Meta isPreview={isPreview}>
        <Time dateTime={publishDateStrict}>
          <BsCalendar title="Дата публикации" />
          {publishDateOutput}
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
