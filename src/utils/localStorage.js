// Layer 1: Directive
// Goal: Provide helper functions to safely interact with the browser's `localStorage` for persisting application state.
// Inputs: Key (string), Value (any for saving, none for loading).
// Edge Cases:
//     - `localStorage` not available (e.g., in a restrictive environment).
//     - Invalid JSON format when loading data (e.g., corrupted data).
// Outputs:
//     - Saved data to `localStorage`.
//     - Loaded data from `localStorage` (parsed as JSON).
//     - Default values or `null`/`undefined` on errors or absence of data.

// Layer 2: Orchestration
// This module exports two functions: `loadItem` and `saveItem`.
// `loadItem` will handle reading from localStorage, parsing JSON, and providing a default value on error or absence.
// `saveItem` will handle writing to localStorage, stringifying JSON, and catching potential errors.

/**
 * Layer 3: Execution
 * Loads an item from local storage, parsing it as JSON.
 * @param {string} key The key of the item to load.
 * @param {any} defaultValue The default value to return if the item is not found or parsing fails.
 * @returns {any} The parsed item or the default value.
 */
export const loadItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading item "${key}" from local storage:`, error);
    return defaultValue;
  }
};

/**
 * Layer 3: Execution
 * Saves an item to local storage, stringifying it as JSON.
 * @param {string} key The key of the item to save.
 * @param {any} value The value to save.
 */
export const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving item "${key}" to local storage:`, error);
  }
};
