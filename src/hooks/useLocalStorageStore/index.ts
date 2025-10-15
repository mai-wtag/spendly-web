import { useSyncExternalStore, useCallback, useRef } from "react";
import toast from "react-hot-toast";

export function useLocalStorageStore<T>(key: string, initialValue: T) {
  const snapshotCache = useRef<T>(getInitialValue());

  function getInitialValue(): T {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const stored = localStorage.getItem(key);

      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  }

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) {
          try {
            const stored = localStorage.getItem(key);
            const newValue = stored ? JSON.parse(stored) : initialValue;
            
            if (JSON.stringify(newValue) !== JSON.stringify(snapshotCache.current)) {
              snapshotCache.current = newValue;
              callback();
            }
          } catch (error) {
            alert(`Error handling storage event: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      };

      const handleCustom = (event: Event) => {
        const customEvent = event as CustomEvent;
        
        if (customEvent.detail?.key === key) {
          try {
            const stored = localStorage.getItem(key);
            const newValue = stored ? JSON.parse(stored) : initialValue;
            
            if (JSON.stringify(newValue) !== JSON.stringify(snapshotCache.current)) {
              snapshotCache.current = newValue;
              callback();
            }
          } catch (error) {
            alert(`Error handling custom storage event: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener("localStorageUpdate", handleCustom);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("localStorageUpdate", handleCustom);
      };
    },
    [key, initialValue]
  );

  const getSnapshot = useCallback((): T => {
    return snapshotCache.current;
  }, []);

  const getServerSnapshot = useCallback((): T => {
    return initialValue;
  }, [initialValue]);

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setStore = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const currentValue = snapshotCache.current;
        const newValue = value instanceof Function ? value(currentValue) : value;
        
        if (JSON.stringify(newValue) !== JSON.stringify(currentValue)) {
          localStorage.setItem(key, JSON.stringify(newValue));
          snapshotCache.current = newValue;
          
          window.dispatchEvent(
            new CustomEvent("localStorageUpdate", { detail: { key } })
          );
          
          window.dispatchEvent(
            new StorageEvent("storage", {
              key,
              newValue: JSON.stringify(newValue),
              oldValue: JSON.stringify(currentValue),
              storageArea: localStorage,
              url: window.location.href,
            })
          );
        }
      } catch (error) {
        toast.error(`Error clearing store: ${String(error)}`);
      }
    },
    [key]
  );

  const clearStore = useCallback(() => {
    try {
      localStorage.removeItem(key);
      snapshotCache.current = initialValue;
      
      window.dispatchEvent(
        new CustomEvent("localStorageUpdate", { detail: { key } })
      );
      
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: null,
          oldValue: localStorage.getItem(key),
          storageArea: localStorage,
          url: window.location.href,
        })
      );
    } catch (error) {
      toast.error(`Error clearing store: ${String(error)}`);
    }
  }, [key, initialValue]);

  return [snapshot, setStore, clearStore] as const;
}
