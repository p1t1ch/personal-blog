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
      publishDateStrict: string
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
    <Layout isBlogPost>
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
        publishDateStrict={frontmatter.publishDateStrict}
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
        publishDate(formatString: "DD MMMM YYYY", locale: "ru")
        publishDateStrict: publishDate(formatString: "YYYY-MM-DD")
        tags
        thumbnail {
          childImageSharp {
            fluid(quality: 100, traceSVG: { background: "#fff", color: "#2b2b2b", threshold: 24 }) {
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
