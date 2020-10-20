import React from 'react'
import { themeColors } from '@theme'
import { INITIAL_COLOR_SCHEME_CSS_VAR, COLOR_SCHEME_LC_KEY } from '@/utils/constants'

const defineColorScheme = () => {
  const themeColors = '🎨'
  const colorSchemeLCKey = '🔑'
  const initialColorSchemeCSSVar = '✨'

  let colorScheme
  const siteLevelColorScheme = localStorage.getItem(colorSchemeLCKey)
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const osLevelColorScheme = mql.matches ? 'dark' : 'light'

  if (siteLevelColorScheme) {
    colorScheme = siteLevelColorScheme
  } else {
    colorScheme = osLevelColorScheme
  }

  const root = document.documentElement
  root.style.setProperty(initialColorSchemeCSSVar, colorScheme)
  Object.entries(themeColors).forEach(([colorVar, valueByTheme]) => {
    root.style.setProperty(`--color-${colorVar}`, valueByTheme[colorScheme])
  })
}

const ColorSchemeScript = () => {
  const stringifiedFunction = String(defineColorScheme)
    .replace("'🎨'", JSON.stringify(themeColors))
    .replace('🔑', COLOR_SCHEME_LC_KEY)
    .replace('✨', INITIAL_COLOR_SCHEME_CSS_VAR)

  return <script dangerouslySetInnerHTML={{ __html: `(${stringifiedFunction})()` }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ColorSchemeScript />)
}

export { wrapRootElement } from './gatsby-browser'
