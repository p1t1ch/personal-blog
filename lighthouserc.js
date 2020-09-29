// Configuration for Lighthouse CI
module.exports = {
  ci: {
    collect: {
      // Run Lighthouse only on these routes. Localhost port will be added automatically
      url: ['http://localhost/', 'http://localhost/blog/how-gatsby-blogs-work/'],
      // We need to set build result folder now explicitly because we defined url property
      staticDistDir: './public',
    },
    upload: {
      // We don't want to set up our own server to save reports in a long term
      target: 'temporary-public-storage',
    },
  },
}
