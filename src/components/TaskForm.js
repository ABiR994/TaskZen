// Layer 1: Directive
// Goal: Implement a reusable React component (`TaskForm.js`) for adding new tasks to the TaskZen application.
// Inputs:
//     - `addTask` function (prop from `App.js`) to add a new task.
//     - `existingCategories` array (prop from `App.js`) for smart suggestions.
// Edge Cases:
//     - Empty task text submission.
//     - User inputting a new category.
//     - Keyboard shortcuts (e.g., Enter to submit).
// Outputs:
//     - A form with text input, category input, priority selection, and an add button.
//     - Invokes `addTask` on submission.

// Layer 2: Orchestration
// This component manages its own local state for the input fields.
// It will construct a new task object and pass it up to the parent `App` component via the `addTask` prop.
// Smart suggestions for categories will be provided via a datalist element.
// Basic validation for non-empty task text will be performed before submission.
// Styling is updated to match the new color palette and design principles, with responsiveness for inputs and buttons.

import React, { useState } from 'react';

/**
 * Layer 3: Execution
 * @param {object} props
 * @param {(task: object) => void} props.addTask - Function to add a new task.
 * @param {string[]} props.existingCategories - Array of existing categories for suggestions.
 */
function TaskForm({ addTask, existingCategories }) {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() === '') {
      alert('Task description cannot be empty.');
      return;
    }

    const newTask = {
      id: Date.now().toString(), // Simple unique ID for now
      text: taskText.trim(),
      completed: false,
      category: category.trim() || undefined, // Use undefined if empty
      priority: priority,
      createdAt: Date.now(),
    };

    addTask(newTask);
    setTaskText('');
    setCategory('');
    setPriority('medium'); // Reset to default
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Prevent submitting on Shift+Enter
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg shadow-lg bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="mb-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 text-lg sm:text-xl border-2 border-primary-light dark:border-primary-dark rounded-md
                     focus:ring-2 focus:ring-primary focus:outline-none
                     bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark
                     transition-all duration-300 shadow-sm
                     placeholder-gray-400 dark:placeholder-gray-500"
          aria-label="Task description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="category-input" className="block text-sm font-medium mb-1 text-text-light dark:text-text-dark">Category (optional)</label>
          <input
            id="category-input"
            type="text"
            placeholder="e.g., Work, Home, Personal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            list="categories-datalist"
            className="w-full p-2 text-base border border-primary-light dark:border-primary-dark rounded-md
                     focus:ring-1 focus:ring-primary focus:outline-none
                     bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark
                     transition-all duration-300 shadow-sm
                     placeholder-gray-400 dark:placeholder-gray-500"
            aria-label="Task category"
          />
          <datalist id="categories-datalist">
            {existingCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-light dark:text-text-dark">Priority</label>
          <div className="flex space-x-4 pt-2 text-base">
            {['low', 'medium', 'high'].map((p) => (
              <label key={p} className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  className="form-radio h-5 w-5 text-primary dark:text-primary-light transition-colors duration-300 focus:ring-primary-light"
                />
                <span className="ml-2 capitalize text-text-light dark:text-text-dark">{p}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-full
                   hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary
                   focus:ring-offset-2 dark:focus:ring-offset-background-dark
                   transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
