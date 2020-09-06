import React from 'react'
import ArticleCard, { ArticleCardProps } from '@/components/ArticleCard'

interface ArticlesGridProps {
  /** Articles list */
  articles: ArticleCardProps[]
}
const ArticlesGrid = ({ articles }: ArticlesGridProps) => {
  return articles.length ? (
    <ol
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(17rem, 1fr))',
        gridGap: '1.5rem',
        'li:first-child': {
          gridColumn: '1/-1',
        },
      }}
    >
      {articles.map(article => (
        <li key={article.id}>
          <ArticleCard {...article} css={{ height: '100%' }} />
        </li>
      ))}
    </ol>
  ) : null
}

export default ArticlesGrid
