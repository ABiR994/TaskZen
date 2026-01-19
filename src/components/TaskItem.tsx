/**
 * TaskItem Component
 * Displays a single task with all features:
 * - Completion toggle
 * - Inline editing
 * - Subtasks management
 * - Due date display with overdue indication
 * - Tags display
 * - Priority indicator
 * - Drag handle for reordering
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Subtask, Priority } from '../types';
import { getRelativeDate, isOverdue, toDateInputValue, fromDateInputValue } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  toggleComplete: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (task: Task) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, subtask: Subtask) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  index: number;
  isDragging?: boolean;
}

const priorityConfig = {
  low: {
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-400',
  },
  medium: {
    dot: 'bg-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-400',
  },
  high: {
    dot: 'bg-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-400',
  },
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleComplete,
  deleteTask,
  editTask,
  onToggleSubtask,
  onAddSubtask,
  onDeleteSubtask,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedCategory, setEditedCategory] = useState(task.category || '');
  const [editedPriority, setEditedPriority] = useState<Priority>(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(toDateInputValue(task.dueDate));
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const editInputRef = useRef<HTMLInputElement>(null);
  const subtaskInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop setup
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveEdit = useCallback(() => {
    if (editedText.trim() === '') {
      editInputRef.current?.focus();
      return;
    }
    
    const updatedTask: Task = {
      ...task,
      text: editedText.trim(),
      category: editedCategory.trim() || undefined,
      priority: editedPriority,
      dueDate: fromDateInputValue(editedDueDate),
    };
    
    editTask(updatedTask);
    setIsEditing(false);
  }, [task, editedText, editedCategory, editedPriority, editedDueDate, editTask]);

  const handleCancelEdit = useCallback(() => {
    setEditedText(task.text);
    setEditedCategory(task.category || '');
    setEditedPriority(task.priority);
    setEditedDueDate(toDateInputValue(task.dueDate));
    setIsEditing(false);
  }, [task]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
  }, [task.id, deleteTask]);

  const handleAddSubtask = useCallback(() => {
    if (newSubtaskText.trim() === '') return;
    
    const subtask: Subtask = {
      id: `subtask-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text: newSubtaskText.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    
    onAddSubtask(task.id, subtask);
    setNewSubtaskText('');
    subtaskInputRef.current?.focus();
  }, [task.id, newSubtaskText, onAddSubtask]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleSubtaskKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubtask();
    }
  };

  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const hasOverdueDueDate = isOverdue(task.dueDate) && !task.completed;

  return (
    <div
      ref={setNodeRef}
      style={style}
      role="listitem"
      aria-label={`Task: ${task.text}${task.completed ? ', completed' : ''}`}
      className={`group relative rounded-2xl transition-all duration-300 
        ${isDragging 
          ? 'shadow-2xl scale-[1.02] z-50 opacity-90' 
          : 'shadow-sm hover:shadow-lg'
        }
        ${task.completed 
          ? 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700' 
          : `bg-white dark:bg-gray-800 border-l-4 ${priorityConfig[task.priority].border} border border-gray-100 dark:border-gray-700`
        }
      `}
    >
      {/* Main content */}
      <div className="p-4">
        {/* Top row: drag handle, checkbox, text, and actions */}
        <div className="flex items-start gap-3">
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="mt-1 p-1 rounded cursor-grab active:cursor-grabbing
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700
              opacity-0 group-hover:opacity-100 transition-opacity
              focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Drag to reorder"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
            </svg>
          </button>

          {/* Checkbox */}
          <div className="mt-0.5">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="w-5 h-5 rounded-full border-2 
                border-gray-300 dark:border-gray-500
                checked:bg-primary checked:border-primary
                dark:checked:bg-primary-light dark:checked:border-primary-light
                focus:ring-2 focus:ring-primary/50 focus:ring-offset-0
                transition-all duration-200 cursor-pointer"
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            />
          </div>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  ref={editInputRef}
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 rounded-lg
                    border-2 border-primary dark:border-primary-light
                    focus:ring-2 focus:ring-primary/30 focus:outline-none
                    bg-white dark:bg-gray-700 
                    text-gray-800 dark:text-gray-100"
                  aria-label="Edit task text"
                />
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    placeholder="Category"
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                    className="flex-1 min-w-[120px] p-2 rounded-lg
                      border border-gray-300 dark:border-gray-600
                      focus:ring-2 focus:ring-primary/30 focus:outline-none
                      bg-white dark:bg-gray-700 
                      text-gray-800 dark:text-gray-100 text-sm"
                  />
                  <input
                    type="date"
                    value={editedDueDate}
                    onChange={(e) => setEditedDueDate(e.target.value)}
                    className="p-2 rounded-lg
                      border border-gray-300 dark:border-gray-600
                      focus:ring-2 focus:ring-primary/30 focus:outline-none
                      bg-white dark:bg-gray-700 
                      text-gray-800 dark:text-gray-100 text-sm
                      [color-scheme:light] dark:[color-scheme:dark]"
                  />
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value as Priority)}
                    className="p-2 rounded-lg
                      border border-gray-300 dark:border-gray-600
                      focus:ring-2 focus:ring-primary/30 focus:outline-none
                      bg-white dark:bg-gray-700 
                      text-gray-800 dark:text-gray-100 text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 rounded-lg text-sm font-medium
                      bg-primary hover:bg-primary-dark text-white
                      transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 rounded-lg text-sm font-medium
                      bg-gray-200 dark:bg-gray-600 
                      hover:bg-gray-300 dark:hover:bg-gray-500
                      text-gray-700 dark:text-gray-200
                      transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Task text */}
                <p className={`text-lg leading-relaxed break-words
                  ${task.completed 
                    ? 'text-gray-400 dark:text-gray-500 line-through' 
                    : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {task.text}
                </p>

                {/* Meta information row */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {/* Priority badge */}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                    ${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig[task.priority].dot}`} />
                    {task.priority}
                  </span>

                  {/* Category */}
                  {task.category && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium
                      bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {task.category}
                    </span>
                  )}

                  {/* Due date */}
                  {task.dueDate && (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                      ${hasOverdueDueDate 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {getRelativeDate(task.dueDate)}
                    </span>
                  )}

                  {/* Subtasks count */}
                  {totalSubtasks > 0 && (
                    <button
                      onClick={() => setShowSubtasks(!showSubtasks)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                        bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400
                        hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      {completedSubtasks}/{totalSubtasks}
                    </button>
                  )}

                  {/* Recurring indicator */}
                  {task.recurrence && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                      bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      {task.recurrence.pattern}
                    </span>
                  )}
                </div>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs
                          bg-primary/10 dark:bg-primary-light/10 
                          text-primary-dark dark:text-primary-light"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action buttons */}
          {!isEditing && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Add subtask */}
              <button
                onClick={() => setShowSubtasks(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-purple-500 
                  hover:bg-purple-50 dark:hover:bg-purple-900/30
                  transition-colors"
                aria-label="Add subtask"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </button>
              
              {/* Edit */}
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-blue-500 
                  hover:bg-blue-50 dark:hover:bg-blue-900/30
                  transition-colors"
                aria-label="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              {/* Delete */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 
                  hover:bg-red-50 dark:hover:bg-red-900/30
                  transition-colors"
                aria-label="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Subtasks section */}
        {showSubtasks && (
          <div className="mt-4 ml-9 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Subtasks
            </h4>
            
            {/* Subtask list */}
            {task.subtasks && task.subtasks.length > 0 && (
              <ul className="space-y-2 mb-3">
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id} className="flex items-center gap-2 group/subtask">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => onToggleSubtask(task.id, subtask.id)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600
                        checked:bg-primary checked:border-primary
                        focus:ring-2 focus:ring-primary/50"
                    />
                    <span className={`flex-1 text-sm ${subtask.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                      {subtask.text}
                    </span>
                    <button
                      onClick={() => onDeleteSubtask(task.id, subtask.id)}
                      className="p-1 rounded text-gray-400 hover:text-red-500 
                        opacity-0 group-hover/subtask:opacity-100 transition-opacity"
                      aria-label="Delete subtask"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            
            {/* Add subtask input */}
            <div className="flex gap-2">
              <input
                ref={subtaskInputRef}
                type="text"
                placeholder="Add a subtask..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={handleSubtaskKeyDown}
                className="flex-1 p-2 text-sm rounded-lg
                  border border-gray-300 dark:border-gray-600
                  focus:ring-2 focus:ring-primary/30 focus:outline-none
                  bg-white dark:bg-gray-700 
                  text-gray-800 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                onClick={handleAddSubtask}
                className="px-3 py-2 rounded-lg text-sm font-medium
                  bg-primary/10 hover:bg-primary/20 
                  text-primary dark:text-primary-light
                  transition-colors"
              >
                Add
              </button>
            </div>
            
            <button
              onClick={() => setShowSubtasks(false)}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Hide subtasks
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-2xl z-10">
          <div className="text-center p-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">Delete this task?</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-gray-200 dark:bg-gray-600 
                  hover:bg-gray-300 dark:hover:bg-gray-500
                  text-gray-700 dark:text-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TaskItem);
