import { createContext, useContext } from 'react'
import { ColorSchemeTypes } from '@theme'

export const ColorSchemeContext = createContext<
  [ColorSchemeTypes | undefined, (value: ColorSchemeTypes) => void] | undefined
>(undefined)

const useColorScheme = () => {
  const context = useContext(ColorSchemeContext)

  if (!context) throw new Error('This component must be used within a <ColorSchemeProvider> component')

  return context
}

export default useColorScheme
