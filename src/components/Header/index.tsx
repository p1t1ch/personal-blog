import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { Theme, ThemeProps } from '@theme'
import Subheading from '@/components/Subheading'
import ColorSchemeToggle from '@/components/ColorSchemeToggle'
import DiagonalBlock from '@/components/DiagonalBlock'
import { useTheme } from 'emotion-theming'

const MainSection = styled.section(({ theme }: ThemeProps) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `2rem ${theme.sizes.pagePadding}`,
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
  const theme = useTheme<Theme>()

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
        <DiagonalBlock
          as="section"
          topLine
          bottomLine
          css={{
            display: 'grid',
            placeItems: 'center',
            height: theme.sizes.headHeight,
            padding: `${theme.sizes.clipSize} ${theme.sizes.pagePadding}`,
          }}
        >
          <div>
            <Title>{data.mainTitle}</Title>
            <Subheading />
          </div>
        </DiagonalBlock>
      )}
    </header>
  )
}

export default Header
