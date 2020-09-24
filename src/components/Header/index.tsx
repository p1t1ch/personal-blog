import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { transitions } from 'polished'
import { BsMoon, BsSun } from 'react-icons/bs'
import { ThemeProps } from '@theme'
import useRootWrapperContext from '@/components/RootWrapper/useRootWrapperContext'
import Subheading from '@/components/Subheading'

const HeaderContainer = styled.header(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.dynamic.primary,
  ...transitions(['background-color'], theme.transitions.long),
}))

const MainSection = styled.section(({ theme }: ThemeProps) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.colors.dynamic.secondary,
  ...transitions(['background-color'], theme.transitions.long),
  padding: `2rem ${theme.sizes.pagePadding} ${1.5 + parseFloat(theme.sizes.clipSize)}rem`,
  clipPath: `polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
}))

const HomeSection = styled.section(({ theme }: ThemeProps) => ({
  display: 'grid',
  placeItems: 'center',
  backgroundColor: theme.colors.dynamic.secondary,
  ...transitions(['background-color'], theme.transitions.long),
  marginTop: `calc(-${theme.sizes.clipSize} + ${theme.sizes.linesWidth})`,
  height: theme.sizes.headHeight,
  padding: `2rem ${theme.sizes.pagePadding} ${2 + parseFloat(theme.sizes.clipSize)}rem`,
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
  textAlign: 'center',
}))

const HomeLink = styled(Link)(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.homeLink,
}))

const Button = styled.button(({ theme }: ThemeProps) => ({
  display: 'inline-flex',
  ...theme.typography.styles.darkMode,
}))

const Title = styled.h1(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.h1,
  marginBottom: '1rem',
}))

interface HeaderQuery {
  site: {
    siteMetadata: {
      headerLink: string
      mainTitle: string
    }
  }
}

interface HeaderProps {
  /** Add special section for the home page */
  isHome?: boolean
}

const Header = ({ isHome = false }: HeaderProps) => {
  const { isDarkMode, setIsDarkMode } = useRootWrapperContext()

  const {
    site: { siteMetadata: data },
  }: HeaderQuery = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          headerLink
          mainTitle
        }
      }
    }
  `)

  return (
    <HeaderContainer>
      <MainSection>
        <HomeLink to="/" dangerouslySetInnerHTML={{ __html: data.headerLink }} />
        <Button onClick={() => setIsDarkMode(!isDarkMode)}>
          {!isDarkMode ? <BsMoon title="Перейти в dark mode" /> : <BsSun title="Перейти в light mode" />}
        </Button>
      </MainSection>
      {isHome && (
        <HomeSection>
          <div>
            <Title>{data.mainTitle}</Title>
            <Subheading />
          </div>
        </HomeSection>
      )}
    </HeaderContainer>
  )
}

export default Header
