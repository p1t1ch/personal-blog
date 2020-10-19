import React from 'react'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { transitions } from 'polished'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import colorVar from '@/utils/colorVar'

interface LayoutProps {
  /** Page content */
  children: React.ReactNode
  /** Change layout for home page */
  isHome?: boolean
  /** Change layout for blog post page */
  isBlogPost?: boolean
}

const Layout = ({ children, isHome, isBlogPost }: LayoutProps) => {
  const theme = useTheme<Theme>()

  return (
    <div css={!isBlogPost ? { display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' } : {}}>
      <Header isHome={isHome} />
      <main
        css={{
          backgroundColor: colorVar('primary'),
          ...transitions(['background-color'], theme.transitions.long),
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
