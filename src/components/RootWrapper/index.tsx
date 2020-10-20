import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from '@/components/GlobalStyles'
import ColorSchemeProvider from '@/components/ColorSchemeProvider'
import theme from '@theme'
import 'prism-themes/themes/prism-a11y-dark.css'
import 'prismjs/plugins/command-line/prism-command-line.css'

interface RootWrapperProps {
  /** Site content */
  children: React.ReactNode
}

const RootWrapper = ({ children }: RootWrapperProps) => {
  return (
    <ColorSchemeProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ColorSchemeProvider>
  )
}

export default RootWrapper
