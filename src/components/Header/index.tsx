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
  const { colors, typography } = useTheme<Theme>()
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <header css={{ backgroundColor: colors.primary, color: colors.secondary, padding: '1rem' }}>
      <section css={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/">p1t1ch</Link>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>{!isDarkMode ? 'Dark mode' : 'Light mode'}</button>
      </section>
      {isHome && (
        <section css={{ marginTop: '1.5rem', ...padding('6rem', null), textAlign: 'center' }}>
          <h1 css={typography.styles.h1}>Короткий основной заголовок</h1>
          <p css={typography.styles.h6}>Текст под заголовком, который я ещё не придумал, хотя стоило бы</p>
        </section>
      )}
    </header>
  )
}

export default Header
