import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'
import declOfNum from '@/utils/declOfNum'

const Article = styled.article(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.secondary,
  color: theme.colors.primary,
  boxShadow: theme.shadows.preview,
}))

const Title = styled.h3(({ theme }: ThemeProps) => ({
  color: theme.colors.secondary,
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

const Description = styled.p(() => ({
  padding: '1.5rem',
}))

export interface ArticleCardProps {
  /** Unique id */
  id: string
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

const ArticleCard = ({ id, slug, name, description, image, publishDate, timeToRead, ...props }: ArticleCardProps) => {
  return (
    <Article {...props}>
      <Link to={slug} css={singleGridCell}>
        <Img
          fluid={image}
          alt={`Превью для статьи ${name}`}
          imgStyle={{ height: '16rem', objectFit: 'cover' }}
          css={{ height: '16rem', clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - 1rem))' }}
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
      </Link>
      <Description>{description}</Description>
    </Article>
  )
}

export default ArticleCard
