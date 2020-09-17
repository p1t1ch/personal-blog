import React from 'react'
import { useTheme } from 'emotion-theming'
import { Theme } from '@theme'

interface ContainerProps {
  /** Page content */
  children?: React.ReactNode
  /** Change container size for blog post page */
  isBlogPost?: boolean
}

const Container = ({ children, isBlogPost = false }: ContainerProps) => {
  const theme = useTheme<Theme>()

  return (
    <section
      css={{
        margin: '0 auto',
        padding: `1rem ${theme.sizes.pagePadding} 3rem`,
        maxWidth: isBlogPost ? theme.sizes.blogPostContainerWidth : theme.sizes.mainContainerWidth,
      }}
    >
      {children}
    </section>
  )
}

export default Container
