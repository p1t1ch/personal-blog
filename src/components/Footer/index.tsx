import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'

const FooterContainer = styled.footer(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.static.white,
  color: theme.colors.static.white,
}))

const Wrapper = styled.div(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.static.black,
  padding: `${theme.sizes.clipSize} ${theme.sizes.pagePadding} 1rem`,
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 100%)`,
  textAlign: 'center',
}))

const HomeLink = styled(Link)(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h4,
  color: theme.colors.static.white,
}))

interface FooterQuery {
  site: {
    siteMetadata: {
      footerLink: string
    }
  }
}

const Footer = () => {
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
    <FooterContainer>
      <Wrapper>
        <HomeLink to="/">{data.footerLink}</HomeLink>
      </Wrapper>
    </FooterContainer>
  )
}

export default Footer
