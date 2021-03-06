import React from 'react'
import BlogPostsGridItem, { BlogPostsGridItemProps } from './Item'
import styled from '@emotion/styled'
import { ThemeProps } from '@theme'
import media from '@/utils/media'

export interface BlogPostsGridCompositionProps {
  Item: React.FC<BlogPostsGridItemProps>
}

const List = styled.ol(({ theme }: ThemeProps) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(21rem, 1fr))',
  [media.sm]: {
    gridTemplateColumns: '1fr',
  },
  gridGap: '2rem',
  'li:first-of-type': {
    gridColumn: '1/-1',
    h3: theme.typography.styles.lastBlogPostPreview,
    'a:hover, a:focus': { transform: 'none' },
  },
}))

interface BlogPostsGridProps {
  /** Blog posts list */
  children: React.ReactNode
}

const BlogPostsGrid: React.FC<BlogPostsGridProps> & BlogPostsGridCompositionProps = ({ children }) => {
  return (
    <List>
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </List>
  )
}

BlogPostsGrid.Item = BlogPostsGridItem

export default BlogPostsGrid
