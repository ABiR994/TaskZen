// Layer 1: Directive
// Goal: This file serves as the main application component, orchestrating the overall layout,
// state management for tasks and settings (theme, focus mode), and routing (if applicable).
// It loads initial data from local storage and persists changes.
// Inputs: User interactions (add, edit, delete tasks, toggle theme/focus mode), local storage data.
// Edge Cases: Empty local storage, invalid data format in local storage.
// Outputs: Rendered UI of the TaskZen application.

// Layer 2: Orchestration
// This component manages the top-level state for the entire application.
// It will define the core application layout and house the main state for tasks,
// the current theme (light/dark), and the focus mode setting.
// Data persistence to and from local storage will be handled here via useEffect.
// Child components will receive necessary state and state-mutating functions as props.
// The header now includes the custom logo. The overall app styling uses the new color palette.
// Responsive adjustments are made for the header and main content area.
// The document title is set for browser tab integration, and a subtle radial gradient is applied.

import React, { useState, useEffect, useMemo } from 'react';
import { loadItem, saveItem } from './utils/localStorage';
import TaskForm from './components/TaskForm'; // Import TaskForm
import TaskList from './components/TaskList'; // Import TaskList
import './index.css'; // Import Tailwind CSS

function App() {
  // Layer 2: Orchestration - State Management
  const [tasks, setTasks] = useState(() => loadItem('tasks', []));
  const [isDarkMode, setIsDarkMode] = useState(() => loadItem('theme', 'light') === 'dark');
  const [isFocusMode, setIsFocusMode] = useState(() => loadItem('focusMode', false));

  // Layer 2: Orchestration - Apply theme on initial load and set document title
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.title = "TaskZen"; // Set browser tab title
  }, [isDarkMode]);

  // Layer 2: Orchestration - Data Persistence (Save)
  useEffect(() => {
    saveItem('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    saveItem('focusMode', isFocusMode);
  }, [isFocusMode]);

  // Layer 2: Orchestration - Event Handlers
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleFocusMode = () => {
    setIsFocusMode(prevMode => !prevMode);
  };

  // Layer 2: Orchestration - Task Management Functions
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Layer 2: Orchestration - Derive existing categories for smart suggestions
  const existingCategories = useMemo(() => {
    const categories = tasks.map(task => task.category).filter(Boolean);
    return [...new Set(categories)];
  }, [tasks]);

  // Layer 3: Execution - Apply new color palette, layout, and responsive styles
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300
      ${isDarkMode
        ? 'bg-gradient-to-br from-background-dark to-gray-900 text-text-dark'
        : 'bg-gradient-to-br from-white to-blue-50 text-gray-800'
      }`}>
       <header className="container mx-auto p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Responsive adjustments:
            - `p-2 sm:p-4`: Smaller padding on extra-small screens, scales up on 'sm' breakpoint and above.
            - `flex-col sm:flex-row`: Stacks items vertically by default on mobile, switches to horizontal on 'sm' and above.
            - `space-y-4 sm:space-y-0`: Adds vertical space between elements on mobile, removes it on 'sm' and above.
        */}
        <div className="flex items-center space-x-2">
          {/* Logo Integration */}
          <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="TaskZen Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">TaskZen</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-primary-dark hover:brightness-110 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleFocusMode}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105
              ${isFocusMode ? 'bg-accent text-text-light' : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} hover:brightness-110`}
            aria-label="Toggle focus mode"
          >
            {isFocusMode ? 'Focus On' : 'Focus Off'}
          </button>
        </div>
      </header>
       <main className="container mx-auto px-2 py-4 sm:p-4 max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Responsive adjustments:
            - `px-2 py-4 sm:p-4`: Tighter horizontal padding on extra-small screens (`px-2`),
                                   more vertical padding (`py-4`), scales to uniform `p-4` on 'sm' and above.
            - `max-w-*`: Ensures content does not stretch too wide on very large screens,
                         but allows full width on smaller screens within the `px-2` padding.
        */}
        <TaskForm addTask={addTask} existingCategories={existingCategories} />
        <h2 className="text-2xl font-semibold mb-4 mt-8">Your Tasks</h2>
        <TaskList
          tasks={tasks}
          isFocusMode={isFocusMode}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </main>
    </div>
  );
}

export default App;
