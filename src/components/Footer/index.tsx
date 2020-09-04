import React from 'react'
import { Link } from 'gatsby'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'

const Footer = () => {
  const { colors } = useTheme<Theme>()

  return (
    <footer
      css={{
        backgroundColor: colors.primary,
        color: colors.secondary,
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      <Link to="/">p1t1ch</Link>
    </footer>
  )
}

export default Footer
