exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug,
      component: require.resolve('./src/templates/article.tsx'),
      context: { id: node.id },
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    actions.createNodeField({
      name: 'slug',
      node,
      value: `/blog/${node.frontmatter.slug}`,
    })
  }
}
