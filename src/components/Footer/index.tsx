import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { transitions } from 'polished'
import { ThemeProps } from '@theme'
import colorVar from '@/utils/colorVar'

const FooterContainer = styled.footer(({ theme }: ThemeProps) => ({
  backgroundColor: colorVar('primary'),
  ...transitions(['background-color'], theme.transitions.long),
}))

const Wrapper = styled.div(({ theme }: ThemeProps) => ({
  backgroundColor: colorVar('secondary'),
  ...transitions(['background-color'], theme.transitions.long),
  padding: `${theme.sizes.clipSize} ${theme.sizes.pagePadding} 1rem`,
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 100%)`,
  textAlign: 'center',
}))

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
