import toast from "react-hot-toast";

export const createStorageSubscription = <T>(
  key: string,
  initialValue: T,
  snapshotCache: React.MutableRefObject<T>,
  callback: () => void
) => {
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
        toast.error(
          `Error handling storage event: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
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
        toast.error(
          `Error handling custom storage event: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("localStorageUpdate", handleCustom);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("localStorageUpdate", handleCustom);
  };
};
