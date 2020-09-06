import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import ArticleHead from '@/components/ArticleHead'
import Container from '@/components/Container'
import Content from '@/components/Content'

interface ArticleTemplateQuery {
  markdownRemark: {
    html: string
    frontmatter: {
      date: string
      title: string
    }
  }
}

const ArticleTemplate = ({ data }: PageProps<ArticleTemplateQuery>) => {
  const { html, frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Seo />
      <article>
        <ArticleHead alt="Клавиатура" minutesRead={12} name={frontmatter.title} releaseDate={frontmatter.date} />
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
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
      }
    }
  }
`

export default ArticleTemplate
