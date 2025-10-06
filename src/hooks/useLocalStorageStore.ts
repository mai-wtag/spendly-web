import { useSyncExternalStore } from "react";


export function useLocalStorageStore<T>(key: string, initialValue: T) {
  
  const storeCache: { current: T } = { current: getInitialValue() };

  function getInitialValue(): T {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  }

  function getSnapshot(): T {
    return storeCache.current;
  }

  function subscribe(callback: () => void) {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const stored = localStorage.getItem(key);
          const parsed = stored ? JSON.parse(stored) : initialValue;
          
          if (JSON.stringify(parsed) !== JSON.stringify(storeCache.current)) {
            storeCache.current = parsed;
            callback();
          }
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }

  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  const setStore = (value: T | ((prev: T) => T)) => {
    try {
      const newValue =
        value instanceof Function ? value(storeCache.current) : value;
      if (JSON.stringify(newValue) !== JSON.stringify(storeCache.current)) {
        localStorage.setItem(key, JSON.stringify(newValue));
        storeCache.current = newValue;
        
        setTimeout(() => {
          window.dispatchEvent(new StorageEvent("storage", { key }));
        }, 0);
      }
    } catch (err) {
      console.error("Error setting store:", err);
    }
  };

  const clearStore = () => {
    try {
      localStorage.removeItem(key);
      storeCache.current = initialValue;
      setTimeout(() => {
        window.dispatchEvent(new StorageEvent("storage", { key }));
      }, 0);
    } catch (err) {
      console.error("Error clearing store:", err);
    }
  };

  return [snapshot, setStore, clearStore] as const;
}
