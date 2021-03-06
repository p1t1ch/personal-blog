import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LayoutProps {
  /** Page content */
  children: React.ReactNode
  /** Change layout for home page */
  isHome?: boolean
  /** Change layout for blog post page */
  isBlogPost?: boolean
}

const Layout = ({ children, isHome, isBlogPost }: LayoutProps) => {
  return (
    <div css={!isBlogPost ? { display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' } : {}}>
      <Header isHome={isHome} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
