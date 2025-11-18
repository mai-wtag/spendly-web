import { useSyncExternalStore, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { getStorageValue, setStorageValue, dispatchStorageEvent } from "hooks/useLocalStorageStore/storageHelpers";
import { createStorageSubscription } from "hooks/useLocalStorageStore/storageSubscription";

export function useLocalStorageStore<T>(key: string, initialValue: T) {
  const snapshotCache = useRef<T>(getStorageValue(key, initialValue));

  const subscribe = useCallback(
    (callback: () => void) => {
      return createStorageSubscription(key, initialValue, snapshotCache, callback);
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
          setStorageValue(key, newValue);
          snapshotCache.current = newValue;

          dispatchStorageEvent(
            key,
            JSON.stringify(newValue),
            JSON.stringify(currentValue)
          );
        }
      } catch (error) {
        toast.error(`Error updating store: ${String(error)}`);
      }
    },
    [key]
  );

  const clearStore = useCallback(() => {
    try {
      const oldValue = localStorage.getItem(key);
      localStorage.removeItem(key);
      snapshotCache.current = initialValue;

      dispatchStorageEvent(key, null, oldValue);
    } catch (error) {
      toast.error(`Error clearing store: ${String(error)}`);
    }
  }, [key, initialValue]);

  return [snapshot, setStore, clearStore] as const;
}
