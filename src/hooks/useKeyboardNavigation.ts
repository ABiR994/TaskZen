/**
 * Custom hook for keyboard navigation in task lists
 * Provides accessibility-focused keyboard controls
 */

import { useCallback, useEffect, useRef } from 'react';

interface UseKeyboardNavigationOptions {
  itemCount: number;
  onSelect?: (index: number) => void;
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
  onToggleComplete?: (index: number) => void;
  isEnabled?: boolean;
}

interface UseKeyboardNavigationReturn {
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  getItemProps: (index: number) => {
    tabIndex: number;
    'aria-selected': boolean;
    onFocus: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
}

export const useKeyboardNavigation = ({
  itemCount,
  onSelect,
  onDelete,
  onEdit,
  onToggleComplete,
  isEnabled = true,
}: UseKeyboardNavigationOptions): UseKeyboardNavigationReturn => {
  const focusedIndexRef = useRef<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const setFocusedIndex = useCallback((index: number) => {
    focusedIndexRef.current = Math.max(-1, Math.min(index, itemCount - 1));
  }, [itemCount]);

  const focusItem = useCallback((index: number) => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('[role="listitem"]');
    const targetItem = items[index] as HTMLElement;
    if (targetItem) {
      targetItem.focus();
      setFocusedIndex(index);
    }
  }, [setFocusedIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (!isEnabled) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'j':
        e.preventDefault();
        if (index < itemCount - 1) {
          focusItem(index + 1);
        }
        break;
      case 'ArrowUp':
      case 'k':
        e.preventDefault();
        if (index > 0) {
          focusItem(index - 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        focusItem(itemCount - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect?.(index);
        break;
      case 'Delete':
      case 'Backspace':
        if (e.shiftKey) {
          e.preventDefault();
          onDelete?.(index);
        }
        break;
      case 'e':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          onEdit?.(index);
        }
        break;
      case 'x':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          onToggleComplete?.(index);
        }
        break;
    }
  }, [isEnabled, itemCount, focusItem, onSelect, onDelete, onEdit, onToggleComplete]);

  // Reset focus when item count changes
  useEffect(() => {
    if (focusedIndexRef.current >= itemCount) {
      setFocusedIndex(itemCount - 1);
    }
  }, [itemCount, setFocusedIndex]);

  const getItemProps = useCallback((index: number) => ({
    tabIndex: index === 0 ? 0 : -1,
    'aria-selected': focusedIndexRef.current === index,
    onFocus: () => setFocusedIndex(index),
    onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, index),
  }), [setFocusedIndex, handleKeyDown]);

  return {
    focusedIndex: focusedIndexRef.current,
    setFocusedIndex,
    containerRef,
    getItemProps,
  };
};
