// Configuration for Lighthouse CI
module.exports = {
  ci: {
    collect: {
      // Run Lighthouse only on these routes. Localhost port will be added automatically
      url: ['http://localhost/', 'http://localhost/blog/how-gatsby-blogs-work/'],
      // We need to set build result folder now explicitly because we defined url property
      staticDistDir: './public',
      settings: {
        // Set the screen size
        emulatedFormFactor: 'desktop',
        // Define CPU and network characteristics for desktop emulation
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    upload: {
      // We don't want to set up our own server to save reports in a long term
      target: 'temporary-public-storage',
    },
  },
}
