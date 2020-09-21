import React from 'react'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'
import { margin, padding, transitions } from 'polished'

const Section = styled.section(({ theme }: ThemeProps) => ({
  ...padding('4rem', null),
  clipPath: `polygon(0 0, 100% ${theme.sizes.clipSize}, 100% 100%, 0 calc(100% - ${theme.sizes.clipSize}))`,
  ...margin(`calc(-${theme.sizes.clipSize} + ${theme.sizes.headOffset})`, null),
  backgroundColor: theme.colors.dynamic.secondary,
  ...transitions(['background-color'], theme.transitions.long),
}))

const Wrapper = styled.div(({ theme, isBlogPost }: ThemeProps & { isBlogPost: boolean }) => ({
  margin: '0 auto',
  maxWidth: isBlogPost ? theme.sizes.blogPostContainerWidth : theme.sizes.mainContainerWidth,
  ...padding(null, theme.sizes.pagePadding),
}))

interface ContainerProps {
  /** Page content */
  children?: React.ReactNode
  /** Change container size for blog post page */
  isBlogPost?: boolean
}

const Container = ({ children, isBlogPost = false, ...props }: ContainerProps) => {
  return (
    <Section {...props}>
      <Wrapper isBlogPost={isBlogPost}>{children}</Wrapper>
    </Section>
  )
}

export default Container
