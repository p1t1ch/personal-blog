import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { ThemeProps } from '@theme'
import styled from '@emotion/styled'
import singleGridCell from '@/utils/singleGridCell'

interface StaticImageQuery {
  file: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

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
  textAlign: 'justify',
}))

interface ArticleCardProps {
  /** Article code for link */
  code: string
  /** Article title */
  name: string
  /** Article short description */
  description: string
  /** Article preview image source */
  // image: string
  /** Article preview image alternative text */
  alt: string
  /** Date of article publication in DD.MM.YYYY format */
  releaseDate: string
  /** Calculated minutes to read based on article size */
  minutesRead: number
}

const ArticleCard = ({ code, name, description, /*image,*/ alt, releaseDate, minutesRead }: ArticleCardProps) => {
  const data: StaticImageQuery = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "keyboard.jpg" }) {
        childImageSharp {
          fluid(grayscale: true, traceSVG: { color: "#333" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <Article>
      <Link to={`/blog/${code}`} css={singleGridCell}>
        <Img
          fluid={data.file.childImageSharp.fluid}
          alt={alt}
          imgStyle={{ height: '16rem', objectFit: 'cover' }}
          css={{ height: '16rem', clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - 1rem))' }}
        />
        <Title>{name}</Title>
        <Meta>
          <time aria-label="Дата выхода" dateTime={releaseDate.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
            {releaseDate}
          </time>
          <div aria-label="Примерно время чтения">{minutesRead} минут</div>
        </Meta>
      </Link>
      <Description>{description}</Description>
    </Article>
  )
}

export default ArticleCard
