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
  const { sizes } = useTheme<Theme>()

  return (
    <section
      css={{
        margin: '0 auto',
        padding: sizes.pagePadding,
        maxWidth: isBlogPost ? sizes.blogPostContainerWidth : sizes.mainContainerWidth,
      }}
    >
      {children}
    </section>
  )
}

export default Container
