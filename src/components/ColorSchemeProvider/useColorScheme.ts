import { createContext, useContext } from 'react'
import { ColorSchemeTypes } from '@theme'

// interface ColorSchemeContextProps {
//   /** Color scheme based on user and OS preferences */
//   colorScheme: ColorSchemeTypes
//   /** Color scheme state setter function */
//   setColorScheme: (value: ColorSchemeTypes) => void
// }

export const ColorSchemeContext = createContext<
  [ColorSchemeTypes | undefined, (value: ColorSchemeTypes) => void] | undefined
>(undefined)

const useColorScheme = () => {
  const context = useContext(ColorSchemeContext)

  if (!context) throw new Error('This component must be used within a <ColorSchemeProvider> component')

  return context
}

export default useColorScheme
