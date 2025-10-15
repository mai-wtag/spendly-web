export const getStorageValue = <T>(key: string, initialValue: T): T => {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const stored = localStorage.getItem(key);
    
    return stored ? JSON.parse(stored) : initialValue;
  } catch {
    return initialValue;
  }
};

export const setStorageValue = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorageValue = (key: string): void => {
  localStorage.removeItem(key);
};

export const dispatchStorageEvent = (key: string, newValue: string | null, oldValue: string | null): void => {
  window.dispatchEvent(
    new CustomEvent("localStorageUpdate", { detail: { key } })
  );

  window.dispatchEvent(
    new StorageEvent("storage", {
      key,
      newValue,
      oldValue,
      storageArea: localStorage,
      url: window.location.href,
    })
  );
};
