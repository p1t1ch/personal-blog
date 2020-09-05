// All defined here properties are passed to Emotion ThemeProvider
// In project they are available via useTheme hook or prop in styled components

const colors = {
  primary: '#333',
  secondary: '#fff',
  active: '#6d4672',
}

const breakpoints = {
  lg: 1440,
  sm: 768,
}

const typography = {
  family: 'Commissioner',
  stack: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ],
  styles: {
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(4.1875rem, 1rem + 2vw, 5.25rem)',
      lineHeight: 1.5,
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(4.1875rem, 1rem + 2vw, 3.375rem)',
      lineHeight: 1.5,
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(3.375rem, 1rem + 2vw, 2.6875rem)',
      lineHeight: 1.5,
    },
    h4: {
      fontWeight: 700,
      fontSize: 'clamp(2.6875rem, 1rem + 2vw, 2.125rem)',
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 600,
      fontSize: 'clamp(2.125rem, 1rem + 2vw, 1.6875rem)',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: 'clamp(1.6875rem, 1rem + 2vw, 1.375rem)',
      lineHeight: 1.5,
    },
    body: {
      fontSize: 'clamp(1.375rem, 1rem + 2vw, 1.125rem)',
      lineHeight: 1.5,
    },
    small: {
      fontSize: 'clamp(1.125rem, 1rem + 2vw, 0.875rem)',
      lineHeight: 1.5,
    },
    extrasmall: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
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

const theme = {
  colors,
  breakpoints,
  typography,
  shadows,
  transitions,
}

// Use this type with useTheme hook
export type Theme = typeof theme

// Use this interface with styled components props
export interface ThemeProps {
  theme: Theme
}

export default theme
