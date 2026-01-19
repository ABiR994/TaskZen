/**
 * App Component - Main Application Container
 * 
 * Features:
 * - Task state management with full CRUD operations
 * - Theme switching (dark/light mode)
 * - Focus mode to hide completed tasks
 * - Export/Import functionality
 * - Keyboard shortcuts
 * - Accessibility features
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { loadItem, saveItem } from './utils/localStorage';
import { exportToJSON, exportToCSV, importFromJSON } from './utils/exportImport';
import { Task, AppSettings } from './types';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

function App() {
  // State
  const [tasks, setTasks] = useState<Task[]>(() => loadItem('tasks', []));
  const [isDarkMode, setIsDarkMode] = useState(() => loadItem<string>('theme', 'light') === 'dark');
  const [isFocusMode, setIsFocusMode] = useState(() => loadItem('focusMode', false));
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Apply theme on load and changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.title = 'TaskZen';
  }, [isDarkMode]);

  // Persist data
  useEffect(() => {
    saveItem('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    saveItem('focusMode', isFocusMode);
  }, [isFocusMode]);

  // Close export menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowKeyboardShortcuts(prev => !prev);
      }
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsDarkMode(prev => !prev);
      }
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsFocusMode(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode(prev => !prev);
  }, []);

  const addTask = useCallback((newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  }, []);

  const toggleComplete = useCallback((taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed, completedAt: !task.completed ? Date.now() : undefined }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const editTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  }, []);

  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(prev => {
      const taskMap = new Map(reorderedTasks.map(t => [t.id, t]));
      return prev.map(task => taskMap.get(task.id) || task);
    });
  }, []);

  // Export/Import handlers
  const handleExportJSON = useCallback(() => {
    const settings: AppSettings = {
      theme: isDarkMode ? 'dark' : 'light',
      focusMode: isFocusMode,
    };
    exportToJSON(tasks, settings);
    setShowExportMenu(false);
  }, [tasks, isDarkMode, isFocusMode]);

  const handleExportCSV = useCallback(() => {
    exportToCSV(tasks);
    setShowExportMenu(false);
  }, [tasks]);

  const handleImport = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importFromJSON(file);
      setTasks(data.tasks);
      if (data.settings) {
        setIsDarkMode(data.settings.theme === 'dark');
        setIsFocusMode(data.settings.focusMode);
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import file. Please check the file format.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowExportMenu(false);
  }, []);

  // Derive existing categories and tags for suggestions
  const existingCategories = useMemo(() => {
    const categories = tasks.map(task => task.category).filter((c): c is string => Boolean(c));
    return [...new Set(categories)];
  }, [tasks]);

  const existingTags = useMemo(() => {
    const tags = tasks.flatMap(task => task.tags || []);
    return [...new Set(tags)];
  }, [tasks]);

  // Stats
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300
      ${isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800'
      }`}
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
          focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="announcements" />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 
        border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={process.env.PUBLIC_URL + '/logo.svg'} 
                  alt="" 
                  className="h-10 w-10 drop-shadow-md" 
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark 
                  bg-clip-text text-transparent">
                  TaskZen
                </h1>
                {totalCount > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {completedCount}/{totalCount} completed ({progressPercentage}%)
                  </p>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Keyboard shortcuts button */}
              <button
                onClick={() => setShowKeyboardShortcuts(true)}
                className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  hover:text-gray-700 dark:hover:text-gray-200
                  transition-all duration-200"
                aria-label="Show keyboard shortcuts"
                title="Keyboard shortcuts (?)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>

              {/* Export/Import menu */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    hover:text-gray-700 dark:hover:text-gray-200
                    transition-all duration-200"
                  aria-label="Export or import tasks"
                  aria-expanded={showExportMenu}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl 
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    overflow-hidden z-50">
                    <button
                      onClick={handleExportJSON}
                      className="w-full px-4 py-3 text-left text-sm flex items-center gap-3
                        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Export JSON
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-3 text-left text-sm flex items-center gap-3
                        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Export CSV
                    </button>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-3 text-left text-sm flex items-center gap-3
                        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Import JSON
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  aria-label="Import tasks from file"
                />
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl
                  bg-gray-100 dark:bg-gray-800
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  text-gray-600 dark:text-gray-300
                  transition-all duration-300 transform hover:scale-105"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title="Toggle theme (D)"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Focus mode toggle */}
              <button
                onClick={toggleFocusMode}
                className={`px-4 py-2 rounded-xl font-medium text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${isFocusMode
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                aria-pressed={isFocusMode}
                title="Toggle focus mode (F)"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Focus
                </span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          {totalCount > 0 && (
            <div className="mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${progressPercentage}% of tasks completed`}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-3xl">
        <TaskForm 
          addTask={addTask} 
          existingCategories={existingCategories} 
          existingTags={existingTags}
        />
        
        <section aria-label="Task list">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 mt-8 
            text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Your Tasks
          </h2>
          <TaskList
            tasks={tasks}
            isFocusMode={isFocusMode}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={editTask}
            reorderTasks={reorderTasks}
          />
        </section>
      </main>

      {/* Keyboard shortcuts modal */}
      {showKeyboardShortcuts && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowKeyboardShortcuts(false)}
        >
          <div 
            className="w-full max-w-md rounded-2xl shadow-2xl 
              bg-white dark:bg-gray-800 p-6
              transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { key: '?', action: 'Show/hide this help' },
                { key: 'D', action: 'Toggle dark mode' },
                { key: 'F', action: 'Toggle focus mode' },
                { key: 'Ctrl+F', action: 'Search tasks' },
                { key: 'Esc', action: 'Clear search / Close modal' },
                { key: 'Arrow keys', action: 'Navigate task list' },
                { key: 'X', action: 'Toggle task completion' },
                { key: 'E', action: 'Edit selected task' },
                { key: 'Shift+Del', action: 'Delete selected task' },
              ].map(({ key, action }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-gray-600 dark:text-gray-400">{action}</span>
                  <kbd className="px-2 py-1 rounded-md text-sm font-mono
                    bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                    border border-gray-300 dark:border-gray-600">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>TaskZen - Your zen-like task manager</p>
      </footer>
    </div>
  );
}

export default App;
