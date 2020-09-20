import React from 'react'
import { Link } from 'gatsby'
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
  ...theme.typography.styles.h6,
  color: theme.colors.static.white,
}))

const Footer = () => {
  return (
    <FooterContainer>
      <Wrapper>
        <HomeLink to="/">p1t1ch.com</HomeLink>
      </Wrapper>
    </FooterContainer>
  )
}

export default Footer
