// All defined here properties are passed to Emotion ThemeProvider
// In project they are available via useTheme hook or prop in styled components

const palette = {
  black: '#2b2b2b',
  white: '#fff',
  darkPurple: '#6d4672',
  lightPurple: '#ea9ff4',
  yellow: '#d4d0ab',
}

export const lightTheme = {
  primary: palette.black,
  secondary: palette.white,
  active: palette.darkPurple,
}

export const darkTheme = {
  primary: palette.white,
  secondary: palette.black,
  active: palette.lightPurple,
}

const colors = {
  static: palette,
  dynamic: lightTheme,
}

const breakpoints = {
  lg: 1440,
  sm: 768,
}

const sizes = {
  // Main container max width
  mainContainerWidth: '90rem',
  // Blog post container max width
  blogPostContainerWidth: '60ch',
  // Horizontal paddings for all page containers
  pagePadding: '1rem',
  // Difference of heights in clip-path
  clipSize: '2rem',
  // Height of blog post head and home page section
  headHeight: '25rem',
  // Height of blog post head in preview block
  previewHeight: '18rem',
  // Size of borders and sections offsets
  linesWidth: '0.175rem',
}

const typography = {
  family: 'Commissioner',
  stacks: {
    sansSerif: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Avenir Next"',
      'Avenir',
      'Helvetica Neue',
      'Helvetica',
      'Ubuntu',
      'Roboto',
      'Noto',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ],
    monospace: ['Menlo', 'Consolas', 'Monaco', '"Liberation Mono"', '"Lucida Console"', 'monospace'],
  },
  styles: {
    // Sizes are calculated with Major Third scale with slight changes: 76 61 49 39 31 25 20 18 16
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.4375rem, 5vw, 4.75rem)', // 76-39
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(1.5626rem, 3.25vw, 2.4375rem)', // 39-25
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.25rem, 2.5vw, 1.9375rem)', // 31-20
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: 'clamp(1.125rem, 2.5vw, 1.5625rem)', // 25-18
      lineHeight: 1.4,
    },
    body: {
      fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)', // 20-18
      lineHeight: 1.6,
    },
    small: {
      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', // 18-16
      lineHeight: 1.6,
    },
    subheading: {
      fontWeight: 500,
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5626rem)', // 25-20
      lineHeight: 1.4,
    },
    homeLink: {
      fontWeight: 600,
      fontSize: '1.9375rem', // 31
      lineHeight: 1.3,
    },
    darkMode: {
      fontSize: '3.0625rem', // 49
    },
    blogPostPreview: {
      fontWeight: 600,
      fontSize: 'clamp(1.5625rem, 3vw, 1.9375rem)', // 31-25
      lineHeight: 1.3,
    },
    lastBlogPostPreview: {
      fontWeight: 700,
      fontSize: 'clamp(1.9375rem, 3vw, 3.0625rem)', // 49-31
      lineHeight: 1.3,
    },
  },
}

const transitions = {
  short: `200ms ease-in-out`,
  long: `500ms ease-in-out`,
}

const prism = {
  // Font size is set in ems relative to blog post text, and all inner sizes calculated in ems
  fontSize: '0.85em',
  prePadding: {
    basic: '1em',
    top: '2em',
  },
  codePadding: {
    vertical: '0.125em',
    horizontal: '0.25em',
  },
  highlight: {
    border: '0.25em',
    transparency: 0.9,
  },
  commandLine: {
    border: '0.1em',
    padding: '0.5em',
  },
  language: {
    border: '0.125em',
    padding: '0.5em',
  },
}

const theme = {
  colors,
  breakpoints,
  sizes,
  typography,
  transitions,
  prism,
}

// Use this type with useTheme hook
export type Theme = typeof theme

// Use this interface with styled components props
export interface ThemeProps {
  theme: Theme
}

export default theme
