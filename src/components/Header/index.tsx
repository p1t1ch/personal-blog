import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { margin } from 'polished'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'
import Subheading from '@/components/Subheading'
import ColorSchemeToggle from '@/components/ColorSchemeToggle'
import colorVar from '@/utils/colorVar'

const MainSection = styled.section(({ theme }: ThemeProps) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `2rem ${theme.sizes.pagePadding}`,
}))

const DiagonalLine = styled.div(({ theme }: ThemeProps) => ({
  width: '100%',
  height: theme.sizes.clipSize,
  backgroundColor: colorVar('primary'),
  clipPath: `polygon(0 0, 100% calc(100% - ${theme.sizes.linesWidth}), 100% 100%, 0 ${theme.sizes.linesWidth})`,
}))

const HomeSectionContent = styled.div(({ theme }: ThemeProps) => ({
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  padding: `2rem ${theme.sizes.pagePadding}`,
  clipPath: `polygon(0 0, 100% calc(${theme.sizes.clipSize} - ${theme.sizes.linesWidth}), 100% 100%, 0 calc(100% - ${theme.sizes.clipSize} + ${theme.sizes.linesWidth}))`,
  height: theme.sizes.headHeight,
  ...margin(`calc(-${theme.sizes.clipSize} + ${theme.sizes.linesWidth})`, null),
}))

const HomeLink = styled(Link)(({ theme }: ThemeProps) => ({
  ...theme.typography.styles.homeLink,
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
    <header>
      <MainSection>
        <HomeLink to="/" dangerouslySetInnerHTML={{ __html: data.headerLink }} />
        <ColorSchemeToggle />
      </MainSection>
      {isHome && (
        <section>
          <DiagonalLine />
          <HomeSectionContent>
            <div>
              <Title>{data.mainTitle}</Title>
              <Subheading />
            </div>
          </HomeSectionContent>
          <DiagonalLine />
        </section>
      )}
    </header>
  )
}

export default Header
