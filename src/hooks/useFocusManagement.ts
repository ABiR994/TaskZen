/**
 * Custom hook for managing focus and announcements for screen readers
 */

import { useCallback, useRef } from 'react';

interface UseFocusManagementReturn {
  announceRef: React.RefObject<HTMLDivElement | null>;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  focusElement: (selector: string) => void;
  focusRef: React.RefObject<HTMLElement | null>;
}

export const useFocusManagement = (): UseFocusManagementReturn => {
  const announceRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLElement>(null);

  /**
   * Announces a message to screen readers
   */
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceRef.current) {
      announceRef.current.setAttribute('aria-live', priority);
      announceRef.current.textContent = message;
      // Clear after announcement to allow repeated announcements
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  /**
   * Focuses an element by selector
   */
  const focusElement = useCallback((selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  }, []);

  return {
    announceRef,
    announce,
    focusElement,
    focusRef,
  };
};

/**
 * Accessible live region component for screen reader announcements
 */
export const createLiveRegion = (): HTMLDivElement => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.setAttribute('class', 'sr-only');
  liveRegion.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `;
  document.body.appendChild(liveRegion);
  return liveRegion;
};
