// Layer 1: Directive
// Goal: Implement a React component (`TaskList.js`) responsible for displaying a filterable and sortable list of tasks.
// Inputs:
//     - `tasks` array (prop from `App.js`).
//     - `isFocusMode` boolean (prop from `App.js`) to hide completed tasks.
//     - Functions for task manipulation (e.g., `toggleComplete`, `deleteTask`, `editTask`) passed down from `App.js`.
// Edge Cases:
//     - Empty task list.
//     - No tasks matching current filters.
// Outputs:
//     - A rendered list of `TaskItem` components, filtered and sorted according to current criteria.

// Layer 2: Orchestration
// This component will receive the raw list of tasks and apply filtering based on `isFocusMode`.
// It will then sort the tasks (e.g., by creation date).
// Each individual task will be rendered by a `TaskItem` component, to which relevant props are passed.
// It will also handle the display of a message when no tasks are present.
// The empty state message is styled to match the new UI.

import React from 'react';
import TaskItem from './TaskItem';

/**
 * Layer 3: Execution
 * @param {object} props
 * @param {Array<object>} props.tasks - Array of task objects.
 * @param {boolean} props.isFocusMode - If true, only incomplete tasks are shown.
 * @param {(id: string) => void} props.toggleComplete - Function to toggle task completion.
 * @param {(id: string) => void} props.deleteTask - Function to delete a task.
 * @param {(updatedTask: object) => void} props.editTask - Function to edit a task.
 */
function TaskList({ tasks, isFocusMode, toggleComplete, deleteTask, editTask }) {
  // Filter tasks based on focus mode
  const filteredTasks = isFocusMode ? tasks.filter(task => !task.completed) : tasks;

  // Sort tasks - for now, by creation date descending
  // More complex sorting (e.g., by priority, then creation date) can be added here
  const sortedTasks = [...filteredTasks].sort((a, b) => b.createdAt - a.createdAt);

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center p-8 text-text-light dark:text-text-dark opacity-75">
        <p className="text-xl font-semibold">No tasks yet! ✨</p>
        <p className="text-md mt-2">Add one above to get started.</p>
        {isFocusMode && <p className="text-md mt-2 text-primary-dark dark:text-primary-light">Focus mode is on, completed tasks are hidden.</p>}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
