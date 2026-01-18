// Layer 1: Directive
// Goal: Implement a React component (`TaskItem.js`) to display a single task and provide interaction points for editing, marking complete, and deleting.
// Inputs:
//     - `task` object (prop from `TaskList.js`).
//     - `toggleComplete` function (prop from `TaskList.js`).
//     - `deleteTask` function (prop from `TaskList.js`).
//     - `editTask` function (prop from `TaskList.js`).
// Edge Cases:
//     - Task text is very long (should truncate or wrap).
//     - Task is in editing mode (show input field instead of text).
//     - Confirmation before deleting.
// Outputs:
//     - A visual representation of a single task.
//     - Interactive elements to change task status or details.

// Layer 2: Orchestration
// This component manages its own local state for the editing mode (`isEditing`) and temporary edited values.
// It conditionally renders either the task's display view or an edit form.
// Interaction with parent component (`TaskList`) is done via props: `toggleComplete`, `deleteTask`, `editTask`.
// Priority display uses conditional styling.
// Styling is updated to match the new color palette, including completed task appearance and button micro-interactions.
// Responsive adjustments ensure elements stack gracefully on smaller screens.

import React, { useState } from 'react';

// Layer 2: Orchestration - Define priority colors using the new palette
const priorityColors = {
  low: 'bg-accent-light text-text-light dark:bg-accent-dark dark:text-text-dark',
  medium: 'bg-primary-light text-text-light dark:bg-primary-dark dark:text-text-dark',
  high: 'bg-red-300 text-red-800 dark:bg-red-700 dark:text-red-200',
};

/**
 * Layer 3: Execution
 * @param {object} props
 * @param {object} props.task - The task object to display.
 * @param {(id: string) => void} props.toggleComplete - Function to toggle task completion.
 * @param {(id: string) => void} props.deleteTask - Function to delete a task.
 * @param {(updatedTask: object) => void} props.editTask - Function to edit a task.
 */
function TaskItem({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedCategory, setEditedCategory] = useState(task.category || '');
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSaveEdit = () => {
    if (editedText.trim() === '') {
      alert('Task description cannot be empty.');
      return;
    }
    const updatedTask = {
      ...task,
      text: editedText.trim(),
      category: editedCategory.trim() || undefined,
      priority: editedPriority,
    };
    editTask(updatedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(task.text);
    setEditedCategory(task.category || '');
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg shadow-sm
        ${task.completed
          ? 'bg-completed-light dark:bg-completed-dark opacity-70'
          : 'bg-background-light dark:bg-gray-800'
        }
        transition-all duration-300 ease-in-out hover:shadow-md dark:hover:shadow-lg-dark transform hover:-translate-y-0.5`}
    >
      {isEditing ? (
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2 sm:mr-4 w-full">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-2 text-base border-2 border-primary-light dark:border-primary-dark rounded-md focus:ring-1 focus:ring-primary bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark"
          />
          <input
            type="text"
            placeholder="Category"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            className="w-full p-2 text-base border-2 border-primary-light dark:border-primary-dark rounded-md focus:ring-1 focus:ring-primary bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark"
          />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 col-span-full mt-2">
            {['low', 'medium', 'high'].map((p) => (
              <label key={p} className="inline-flex items-center cursor-pointer text-base">
                <input
                  type="radio"
                  name={`edit-priority-${task.id}`}
                  value={p}
                  checked={editedPriority === p}
                  onChange={() => setEditedPriority(p)}
                  className="form-radio h-5 w-5 text-primary dark:text-primary-light focus:ring-primary-light"
                />
                <span className="ml-2 capitalize text-text-light dark:text-text-dark">{p}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow w-full">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="form-checkbox h-6 w-6 text-primary dark:text-primary-light rounded focus:ring-primary-light transition-all duration-300 transform scale-100 hover:scale-110"
            />
            <span className={`ml-3 text-lg sm:text-xl ${task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-text-light dark:text-text-dark'}`}>
              {task.text}
            </span>
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm mt-1 sm:mt-0 sm:space-x-2 space-y-1 sm:space-y-0 ml-9">
            {task.category && (
              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs">
                {task.category}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        </div>
      )}

      <div className="flex space-x-2 mt-4 sm:mt-0 sm:ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              aria-label="Save changes"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary transition-colors duration-300 transform hover:scale-110"
              aria-label="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300 transform hover:scale-110"
              aria-label="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
