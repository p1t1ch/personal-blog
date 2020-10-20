import React, { useEffect, useState } from 'react'
import { ColorSchemeContext } from './useColorScheme'
import { ColorSchemeTypes, themeColors } from '@theme'
import { INITIAL_COLOR_SCHEME_CSS_VAR, COLOR_SCHEME_LC_KEY } from '@/utils/constants'

interface ColorSchemeProviderProps {
  /** Content with access to color scheme */
  children: React.ReactNode
}

const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeTypes | undefined>(undefined)

  useEffect(() => {
    const root = document.documentElement
    const initialColorScheme = root.style.getPropertyValue(INITIAL_COLOR_SCHEME_CSS_VAR) as ColorSchemeTypes
    setColorScheme(initialColorScheme)
  }, [])

  const saveColorScheme = (newColorScheme: ColorSchemeTypes) => {
    window.localStorage.setItem(COLOR_SCHEME_LC_KEY, newColorScheme)

    const root = document.documentElement
    Object.entries(themeColors).forEach(([colorVar, valueByTheme]) => {
      root.style.setProperty(`--color-${colorVar}`, valueByTheme[newColorScheme])
    })

    setColorScheme(newColorScheme)
  }

  return <ColorSchemeContext.Provider value={[colorScheme, saveColorScheme]}>{children}</ColorSchemeContext.Provider>
}

export { default as useColorScheme } from './useColorScheme'

export default ColorSchemeProvider
