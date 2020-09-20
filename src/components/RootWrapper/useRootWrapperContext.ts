import { createContext, useContext } from 'react'

interface RootWrapperContextProps {
  /** Is dark mode enabled */
  darkMode: boolean | undefined | ((value: boolean | ((val: boolean) => boolean)) => void)
  /** Dark mode state setter function */
  setDarkMode: boolean | undefined | ((value: boolean | ((val: boolean) => boolean)) => void)
}

export const RootWrapperContext = createContext<RootWrapperContextProps | undefined>(undefined)

const useRootWrapperContext = (): RootWrapperContextProps => {
  const context = useContext(RootWrapperContext)

  if (!context) {
    throw new Error('This component must be used within a <RootWrapper> component')
  }

  return context
}

export default useRootWrapperContext
