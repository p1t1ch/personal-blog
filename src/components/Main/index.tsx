import React from 'react'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'

interface MainProps {
  /** Page content */
  children?: React.ReactNode
  /** Change container size for home page */
  isHome?: boolean
}

const Main = ({ children, isHome = false }: MainProps) => {
  const { colors } = useTheme<Theme>()

  return (
    <main css={{ backgroundColor: colors.secondary, color: colors.primary, padding: '1.5rem' }}>
      <div css={{ margin: '0 auto', maxWidth: !isHome ? '50rem' : '90rem' }}>{children}</div>
    </main>
  )
}

export default Main
