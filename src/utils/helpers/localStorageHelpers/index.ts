import toast from "react-hot-toast";

export const getFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);

    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const setToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    toast.error(`Storage error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    toast.error(`Storage error: ${error instanceof Error ? error.message : String(error)}`);
  }
};
