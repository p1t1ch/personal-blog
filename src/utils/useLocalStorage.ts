import { useState } from 'react'
import isClient from '@/utils/isClient'

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (!isClient) return initialValue

    try {
      const localStorageValue = window.localStorage.getItem(key)
      if (localStorageValue) {
        return JSON.parse(localStorageValue)
      } else {
        if (initialValue) window.localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }

  return [storedValue, setValue] as [T | undefined, (value: T) => void]
}

export default useLocalStorage
