import React from 'react'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

interface LayoutProps {
  /** Page content */
  children: React.ReactNode
  /** Change layout for home page */
  isHome?: boolean
}

const Layout = ({ children, isHome }: LayoutProps) => {
  return (
    <div css={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      <Header isHome={isHome} />
      <Main isHome={isHome}>{children}</Main>
      <Footer />
    </div>
  )
}

export default Layout
