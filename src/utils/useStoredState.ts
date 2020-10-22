import { useCallback, useMemo, useState } from 'react'

export function useStoredState<T = string>(storageKey: string, initialValue?: T) {
  const storedItem = useMemo(() => {
    const storedString = localStorage.getItem(storageKey)

    return storedString ? (JSON.parse(storedString) as T) : undefined
  }, [storageKey])

  const [value, setValue] = useState(initialValue || storedItem)

  const storeValue = useCallback(
    (newValue?: T) => {
      setValue(newValue)

      if (typeof newValue === 'undefined') {
        localStorage.removeItem(storageKey)
      } else {
        localStorage.setItem(storageKey, JSON.stringify(newValue))
      }
    },
    [storageKey]
  )

  return [value, storeValue] as [T, (value?: T) => void]
}
