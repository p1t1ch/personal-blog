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
  breakpoints: ['lg', 'sm'] as (keyof typeof breakpoints)[],
  family: 'Manrope',
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
    body: {
      desktop: { fontWeight: 400, lineHeight: 1.5, fontSize: 18 },
      mobile: { fontSize: 16 },
    },
    h1: {
      desktop: { fontWeight: 700, lineHeight: 1.5, fontSize: 36 },
      mobile: { fontSize: 24 },
    },
    h2: {
      desktop: { fontWeight: 700, lineHeight: 1.5, fontSize: 28 },
      mobile: { fontSize: 18 },
    },
    title: {
      desktop: { fontWeight: 700, lineHeight: 1.5, fontSize: 40 },
      mobile: { fontSize: 24 },
    },
    nav: {
      desktop: { fontWeight: 200, lineHeight: 1.5, fontSize: 24 },
      mobile: { fontSize: 18 },
    },
  },
}

const shadows = {
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
