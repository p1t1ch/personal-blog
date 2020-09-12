import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { hideVisually } from 'polished'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import ArticlesGrid from '@/components/ArticlesGrid'
import Container from '@/components/Container'
import { FluidObject } from 'gatsby-image'

interface IndexPageQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        id: number
        timeToRead: number
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          date: string
          description: string
          thumbnail: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
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
    image: node.frontmatter.thumbnail.childImageSharp.fluid,
    description: node.frontmatter.description,
    releaseDate: node.frontmatter.date,
    timeToRead: node.timeToRead,
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
          timeToRead
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            thumbnail {
              childImageSharp {
                fluid(grayscale: true, traceSVG: { color: "#333" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
