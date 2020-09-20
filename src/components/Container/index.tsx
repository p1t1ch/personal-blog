import React from 'react'
import { useTheme } from 'emotion-theming'
import { Theme } from '@theme'
import { margin } from 'polished'

interface ContainerProps {
  /** Page content */
  children?: React.ReactNode
  /** Change container size for blog post page */
  isBlogPost?: boolean
}

const Container = ({ children, isBlogPost = false, ...props }: ContainerProps) => {
  const theme = useTheme<Theme>()

  return (
    <section
      css={{
        padding: `4rem ${theme.sizes.pagePadding}`,
        clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
        ...margin(`calc(-${theme.sizes.clipSize} + ${theme.sizes.headOffset})`, null),
        backgroundColor: theme.colors.dynamic.secondary,
      }}
      {...props}
    >
      <div
        css={{
          margin: '0 auto',
          maxWidth: isBlogPost ? theme.sizes.blogPostContainerWidth : theme.sizes.mainContainerWidth,
        }}
      >
        {children}
      </div>
    </section>
  )
}

export default Container
