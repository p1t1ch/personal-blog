import React from 'react'
import styled from '@emotion/styled'
import { useColorScheme } from '@/components/ColorSchemeProvider'
import { BsMoon, BsSun } from 'react-icons/bs'
import { ThemeProps } from '@theme'

const Button = styled.button(({ theme }: ThemeProps) => ({
  display: 'inline-flex',
  ...theme.typography.styles.darkMode,
}))

const ColorSchemeToggle = () => {
  const [colorScheme, setColorScheme] = useColorScheme()
  if (!colorScheme) return null

  return (
    <Button
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      aria-label="Тёмная тема"
      aria-pressed={colorScheme === 'dark'}
    >
      {colorScheme === 'dark' ? <BsSun /> : <BsMoon />}
    </Button>
  )
}

export default ColorSchemeToggle
