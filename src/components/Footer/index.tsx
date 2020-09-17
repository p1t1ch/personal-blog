import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'

const FooterContainer = styled.header(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.secondary,
  color: theme.colors.secondary,
}))

const Wrapper = styled.div(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.primary,
  padding: `${theme.sizes.clipSize} ${theme.sizes.pagePadding} 1rem`,
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 100%)`,
  textAlign: 'center',
}))

const HomeLink = styled(Link)(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h6,
  color: theme.colors.secondary,
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
