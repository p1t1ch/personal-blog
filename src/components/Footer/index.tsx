import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { Theme, ThemeProps } from '@theme'
import DiagonalBlock from '@/components/DiagonalBlock'
import { useTheme } from 'emotion-theming'

const HomeLink = styled(Link)(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h4,
}))

interface FooterQuery {
  site: {
    siteMetadata: {
      footerLink: string
    }
  }
}

const Footer = () => {
  const theme = useTheme<Theme>()

  const {
    site: { siteMetadata: data },
  }: FooterQuery = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          footerLink
        }
      }
    }
  `)
  return (
    <DiagonalBlock as="footer" topLine css={{ padding: `${theme.sizes.clipSize} ${theme.sizes.pagePadding}` }}>
      <HomeLink to="/">{data.footerLink}</HomeLink>
    </DiagonalBlock>
  )
}

export default Footer
