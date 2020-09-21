import React from 'react'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LayoutProps {
  /** Page content */
  children: React.ReactNode
  /** Change layout for home page */
  isHome?: boolean
}

const Layout = ({ children, isHome }: LayoutProps) => {
  const theme = useTheme<Theme>()

  return (
    <>
      <Header isHome={isHome} />
      <main css={{ backgroundColor: theme.colors.static.white }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
