import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Theme } from '@theme'
import { useTheme } from 'emotion-theming'
import { padding } from 'polished'

interface HeaderProps {
  /** Add special section for the home page */
  isHome?: boolean
}

const Header = ({ isHome = false }: HeaderProps) => {
  const { colors } = useTheme<Theme>()
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <header css={{ backgroundColor: colors.primary, color: colors.secondary, padding: '1.5rem' }}>
      <section css={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/">p1t1ch</Link>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>{!isDarkMode ? 'Dark mode' : 'Light mode'}</button>
      </section>
      {isHome && (
        <section css={{ marginTop: '1.5rem', ...padding('6rem', null), textAlign: 'center' }}>
          <h1 css={{ marginBottom: '1rem' }}>Main title</h1>
          <p>Some text about website</p>
        </section>
      )}
    </header>
  )
}

export default Header
