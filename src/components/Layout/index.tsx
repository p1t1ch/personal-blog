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
  const { colors } = useTheme<Theme>()

  return (
    <div css={{ /*display: 'grid', gridTemplateRows: 'auto 1fr auto',*/ minHeight: '100vh' }}>
      <Header isHome={isHome} />
      <main css={{ backgroundColor: colors.secondary }}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
