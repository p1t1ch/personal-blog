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
        excerpt: string
        id: number
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          description: string
          featuredImage: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
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
    image: node.frontmatter.featuredImage.childImageSharp.fluid,
    description: node.excerpt,
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
            date(formatString: "DD.MM.YYYY")
            description
            featuredImage {
              childImageSharp {
                fluid(grayscale: true, traceSVG: { color: "#333" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            title
          }
        }
      }
    }
  }
`

export default IndexPage
