import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'

const HeaderContainer = styled.header(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.secondary,
  color: theme.colors.secondary,
}))

const MainSection = styled.section(({ theme }: ThemeProps) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.primary,
  padding: `2rem ${theme.sizes.pagePadding} ${2 + parseFloat(theme.sizes.clipSize)}rem`,
  clipPath: `polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
}))

const HomeSection = styled.section(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.primary,
  marginTop: `-${theme.sizes.clipSize}`,
  padding: `2rem ${theme.sizes.pagePadding} ${6 + parseFloat(theme.sizes.clipSize)}rem`,
  clipPath: `polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
  textAlign: 'center',
}))

const HomeLink = styled(Link)(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h5,
  color: theme.colors.secondary,
}))

const Title = styled.h1(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h1,
  marginBottom: '1rem',
}))

const Subheading = styled.p(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h6,
}))

interface HeaderProps {
  /** Add special section for the home page */
  isHome?: boolean
}

const Header = ({ isHome = false }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <HeaderContainer>
      <MainSection>
        <HomeLink to="/">p1t1ch.com</HomeLink>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>{!isDarkMode ? 'Dark mode' : 'Light mode'}</button>
      </MainSection>
      {isHome && (
        <HomeSection>
          <Title>Короткий основной заголовок</Title>
          <Subheading>Текст под заголовком, который я ещё не придумал, хотя стоило бы</Subheading>
        </HomeSection>
      )}
    </HeaderContainer>
  )
}

export default Header
