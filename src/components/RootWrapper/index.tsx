import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from '@/components/GlobalStyles'
import theme from '@theme'
import 'prism-themes/themes/prism-a11y-dark.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import useDarkMode from '@/utils/useDarkMode'
import { RootWrapperContext } from './useRootWrapperContext'

interface RootWrapperProps {
  /** Site content */
  children: React.ReactNode
}

const RootWrapper = ({ children }: RootWrapperProps) => {
  const [isDarkMode, setIsDarkMode] = useDarkMode()

  return (
    <RootWrapperContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RootWrapperContext.Provider>
  )
}

export default RootWrapper
