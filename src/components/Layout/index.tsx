import React from 'react'
import styled from '@emotion/styled'
import { padding } from 'polished'
import media from '@/utils/media'
import { ThemeProps } from '@theme'

const Header = styled.header(({ theme }: ThemeProps) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gridColumnGap: theme.grid * 4,
  gridRowGap: theme.grid,
  alignItems: 'center',
  padding: theme.grid * 2,
  backgroundColor: theme.colors.purpleDark,
  boxShadow: theme.shadows.basic,
  zIndex: 1,
  [media.sm]: { gridTemplateColumns: 'auto 1fr', gridColumnGap: theme.grid * 2 },
}))

const Main = styled.main(({ theme }: ThemeProps) => ({
  display: 'grid',
  gridAutoFlow: 'row',
  justifyItems: 'center',
  alignContent: 'start',
  gridGap: theme.grid * 3,
  ...padding(theme.grid * 6, theme.grid * 2),
  backgroundColor: theme.colors.purple,
  [media.sm]: { ...padding(theme.grid * 3, null) },
}))

const Footer = styled.footer(({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.purpleDark,
  ...padding(theme.grid, theme.grid * 2),
  textAlign: 'center',
  boxShadow: theme.shadows.basic,
}))

interface LayoutProps {
  /** Page content */
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      <Header>Header</Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </div>
  )
}

export default Layout
