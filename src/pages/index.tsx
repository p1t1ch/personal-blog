import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { hideVisually } from 'polished'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import BlogPostsGrid from '@/components/BlogPostsGrid'
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
          publishDateStrict: string
          differenceInHours: string
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
  const blogPosts = data.allMarkdownRemark.edges.map(({ node }) => ({
    id: node.id,
    slug: node.fields.slug,
    title: node.frontmatter.title,
    description: node.frontmatter.description,
    image: node.frontmatter.thumbnail.childImageSharp.fluid,
    publishDate: node.frontmatter.publishDate,
    publishDateStrict: node.frontmatter.publishDateStrict,
    timeToRead: node.timeToRead,
  }))

  return (
    <Layout isHome>
      <Seo />
      <Container>
        <h2 css={hideVisually()}>Список статей</h2>
        <BlogPostsGrid>
          {blogPosts.map(blogPost => (
            <BlogPostsGrid.Item
              key={blogPost.id}
              slug={blogPost.slug}
              title={blogPost.title}
              description={blogPost.description}
              thumbnail={blogPost.image}
              publishDate={blogPost.publishDate}
              publishDateStrict={blogPost.publishDateStrict}
              timeToRead={blogPost.timeToRead}
            />
          ))}
        </BlogPostsGrid>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query articlesList {
    allMarkdownRemark(sort: { fields: frontmatter___publishDate, order: DESC }) {
      edges {
        node {
          timeToRead
          id
          fields {
            slug
          }
          frontmatter {
            title
            publishDate(formatString: "DD MMMM YYYY", locale: "ru")
            publishDateStrict: publishDate(formatString: "YYYY-MM-DD")
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1440, traceSVG: { background: "#fff", color: "#2b2b2b", threshold: 24 }) {
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
