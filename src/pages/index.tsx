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
        id: string
        timeToRead: number
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          publishDate: string
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
    publishDate: node.frontmatter.publishDate,
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
            publishDate(formatString: "DD.MM.YYYY")
            description
            thumbnail {
              childImageSharp {
                fluid(grayscale: true, traceSVG: { color: "#2b2b2b" }) {
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
