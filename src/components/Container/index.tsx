import React from 'react'

interface ContainerProps {
  /** Page content */
  children?: React.ReactNode
  /** Change container size for home page */
  isHome?: boolean
}

const Container = ({ children, isHome = false }: ContainerProps) => {
  return (
    <section
      css={{
        margin: '0 auto',
        padding: '1.5rem',
        maxWidth: !isHome ? '50rem' : '90rem',
      }}
    >
      {children}
    </section>
  )
}

export default Container
