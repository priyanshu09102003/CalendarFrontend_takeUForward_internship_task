import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialVal) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialVal;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialVal;
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to read "${key}":`, err);
      return initialVal;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to write "${key}":`, err);
    }
  }, [key, value]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (e) => {
      if (e.key !== key) return;
      try {
        setValue(e.newValue !== null ? JSON.parse(e.newValue) : initialVal);
      } catch (err) {
        console.warn(`[useLocalStorage] Failed to sync "${key}" across tabs:`, err);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialVal]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialVal);
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to remove "${key}":`, err);
    }
  }, [key, initialVal]);

  return [value, setValue, remove];
}