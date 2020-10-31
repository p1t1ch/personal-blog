import React from 'react'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'
import { padding } from 'polished'

const Section = styled.section(() => ({
  ...padding('4rem', null),
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
