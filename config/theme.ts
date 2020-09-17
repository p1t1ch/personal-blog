// All defined here properties are passed to Emotion ThemeProvider
// In project they are available via useTheme hook or prop in styled components

const colors = {
  primary: '#2b2b2b',
  secondary: '#fff',
  active: '#6d4672',
  light: '#d4d0ab',
}

const breakpoints = {
  lg: 1440,
  sm: 768,
}

const sizes = {
  // Main container max width
  mainContainerWidth: '90rem',
  // Blog post container max width
  blogPostContainerWidth: '55ch',
  // Horizontal paddings for all page containers
  pagePadding: '2rem',
  // Headings anchors offsets
  anchorPadding: '0.25rem',
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
    // Sizes are calculated with Major Third scale: 84 67 54 43 34 27 22 18 14
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.6875rem, 5.5vw, 5.25rem)', // 84-43
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(2.125rem, 4.5vw, 4.1875rem)', // 67-34
      lineHeight: 1.1,
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.6875rem, 3.5vw, 3.375rem)', // 54-27
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: 'clamp(1.375rem, 3vw, 2.6875rem)', // 43-22
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: 'clamp(1.125rem, 2.5vw, 2.125rem)', // 34-18
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 500,
      fontSize: 'clamp(1.125rem, 2vw, 1.6875rem)', // 27-18
      lineHeight: 1.3,
    },
    body: {
      fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', // 22-18
      lineHeight: 1.6,
    },
    small: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', // 18-14
      lineHeight: 1.6,
    },
  },
}

const shadows = {
  title: `6px 6px 0 ${colors.primary}`,
  preview: `inset 0 0 0 4px ${colors.primary}, 2px 2px 0 ${colors.secondary}, 10px 8px 0 ${colors.primary}`,
}

const transitions = {
  basic: `300ms ease`,
}

const prism = {
  // Font size is set in ems relative to blog post text, and all inner sizes calculated in ems
  fontSize: '0.9em',
  prePadding: {
    basic: '1em',
    top: '1.5em',
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
  shadows,
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
