import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { hideVisually } from 'polished'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import ArticlesGrid from '@/components/ArticlesGrid'
import Container from '@/components/Container'

interface IndexPageQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        id: number
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          description: string
          title: string
        }
      }
    }[]
  }
}

const IndexPage = ({ data }: PageProps<IndexPageQuery>) => {
  const articles = data.allMarkdownRemark.edges.map(({ node }) => ({
    id: node.id,
    slug: node.fields.slug,
    name: node.frontmatter.title,
    description: node.excerpt,
    alt: 'Клавиатура',
    releaseDate: node.frontmatter.date,
    minutesRead: 12,
  }))
  return (
    <Layout isHome>
      <Seo />
      <Container isHome>
        <h2 css={hideVisually()}>Список статей</h2>
        <ArticlesGrid articles={articles} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query articlesList {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          id
          fields {
            slug
          }
          frontmatter {
            date
            description
            title
          }
        }
      }
    }
  }
`

export default IndexPage
