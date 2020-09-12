import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'
import declOfNum from '@/utils/declOfNum'

// TODO Separate common parts between article head and preview in component

const Title = styled.h1(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h1,
  color: theme.colors.secondary,
  textShadow: theme.shadows.title,
  justifySelf: 'center',
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

export interface ArticleHeadProps {
  /** Article title */
  name: string
  /** Article preview image */
  image: FluidObject
  /** Date of article publication in DD.MM.YYYY format */
  publishDate: string
  /** Calculated minutes to read based on article size */
  timeToRead: number
}

const ArticleHead = ({ name, image, publishDate, timeToRead }: ArticleHeadProps) => {
  return (
    <section css={singleGridCell}>
      <Img
        fluid={image}
        alt={`Превью для статьи ${name}`}
        imgStyle={{ height: '25rem', objectFit: 'cover' }}
        css={{ height: '25rem', clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - 2rem))' }}
      />
      <Title>{name}</Title>
      <Meta>
        <time aria-label="Дата выхода" dateTime={publishDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
          {publishDate}
        </time>
        <div aria-label="Примерное время чтения">
          {timeToRead} {declOfNum(timeToRead, ['минута', 'минуты', 'минут'])}
        </div>
      </Meta>
    </section>
  )
}

export default ArticleHead
