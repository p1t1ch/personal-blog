import { useEffect } from 'react'
import useLocalStorage from '@/utils/useLocalStorage'
import useMedia from '@/utils/useMedia'

const useDarkMode = () => {
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled', undefined)

  const prefersDarkMode = usePrefersDarkMode()
  const enabled = enabledState ?? prefersDarkMode
  console.log(enabled, enabledState, prefersDarkMode)

  useEffect(() => {
    const className = 'dark-mode'
    const element = window.document.body
    if (enabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }, [enabled])

  return [enabled, setEnabledState]
}

const usePrefersDarkMode = () => useMedia<boolean>(['(prefers-color-scheme: dark)'], [true], false)

export default useDarkMode
