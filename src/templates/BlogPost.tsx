import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import BlogPost from '@/components/BlogPost'

interface BlogPostTemplateQuery {
  markdownRemark: {
    html: string
    timeToRead: number
    frontmatter: {
      title: string
      publishDate: string
      tags: string[]
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}

const BlogPostTemplate = ({ data }: PageProps<BlogPostTemplateQuery>) => {
  const { html, timeToRead, frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Seo />
      <BlogPost
        content={html}
        title={frontmatter.title}
        thumbnail={frontmatter.thumbnail.childImageSharp.fluid}
        publishDate={frontmatter.publishDate}
        timeToRead={timeToRead}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query articleById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      timeToRead
      frontmatter {
        title
        publishDate(formatString: "DD.MM.YYYY")
        tags
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
`

export default BlogPostTemplate
