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
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      description: string
      publishDate: string
      tags: string[]
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
      unsplashLink: string
      unsplashAuthor: string
    }
  }
}

const BlogPostTemplate = ({ data }: PageProps<BlogPostTemplateQuery>) => {
  const { html, timeToRead, fields, frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.tags}
        image={frontmatter.thumbnail.childImageSharp.fluid.src}
        pathname={fields.slug}
      />
      <BlogPost
        content={html}
        title={frontmatter.title}
        description={frontmatter.description}
        thumbnail={frontmatter.thumbnail.childImageSharp.fluid}
        unsplashLink={frontmatter.unsplashLink}
        unsplashAuthor={frontmatter.unsplashAuthor}
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
      fields {
        slug
      }
      frontmatter {
        title
        description
        publishDate(formatString: "DD.MM.YYYY")
        tags
        thumbnail {
          childImageSharp {
            fluid(traceSVG: { color: "#2b2b2b" }) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        unsplashLink
        unsplashAuthor
      }
    }
  }
`

export default BlogPostTemplate
