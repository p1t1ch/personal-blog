import { useState, useEffect } from 'react'
import useLocalStorage from '@/utils/useLocalStorage'
import isClient from '@/utils/isClient'

const useDarkMode = () => {
  const [savedMode, setSavedMode] = useLocalStorage<boolean>('darkMode')

  const query = '(prefers-color-scheme: dark)'
  const [prefersDarkMode, setPrefersDarkMode] = useState(isClient ? window.matchMedia(query).matches : false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = () => setPrefersDarkMode(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const isDarkMode = savedMode ?? prefersDarkMode

  return [isDarkMode, setSavedMode]
}

export default useDarkMode
