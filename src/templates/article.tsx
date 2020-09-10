import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import ArticleHead from '@/components/ArticleHead'
import Container from '@/components/Container'
import Content from '@/components/Content'
// import { FluidObject } from 'gatsby-image'

interface ArticleTemplateQuery {
  markdownRemark: {
    html: string
    timeToRead: number
    frontmatter: {
      date: string
      // featuredImage: {
      //   childImageSharp: {
      //     fluid: FluidObject
      //   }
      // }
      title: string
    }
  }
}

const ArticleTemplate = ({ data }: PageProps<ArticleTemplateQuery>) => {
  const { html, timeToRead, frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Seo />
      <article>
        <ArticleHead
          // image={frontmatter.featuredImage.childImageSharp.fluid}
          timeToRead={timeToRead}
          name={frontmatter.title}
          releaseDate={frontmatter.date}
        />
        <Container>
          <Content content={html} />
        </Container>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query articleById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        # featuredImage {
        #   childImageSharp {
        #     fluid(grayscale: true, traceSVG: { color: "#333" }) {
        #       ...GatsbyImageSharpFluid_withWebp_tracedSVG
        #     }
        #   }
        # }
        title
      }
    }
  }
`

export default ArticleTemplate
