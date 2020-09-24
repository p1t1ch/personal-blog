import React from 'react'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { transitions } from 'polished'
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
      <main
        css={{
          backgroundColor: theme.colors.dynamic.primary,
          ...transitions(['background-color'], theme.transitions.long),
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
