/**
 * Local Storage Utilities
 * Provides type-safe helper functions for browser localStorage operations
 */

/**
 * Loads an item from localStorage with type safety
 * @param key - The storage key
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @returns The parsed value or default value
 */
export const loadItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error loading item "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Saves an item to localStorage
 * @param key - The storage key
 * @param value - The value to save (will be JSON stringified)
 */
export const saveItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving item "${key}" to localStorage:`, error);
  }
};

/**
 * Removes an item from localStorage
 * @param key - The storage key to remove
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item "${key}" from localStorage:`, error);
  }
};

/**
 * Clears all items from localStorage
 */
export const clearAll = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
