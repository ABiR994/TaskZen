/**
 * TaskForm Component
 * Provides a comprehensive form for adding new tasks with all features:
 * - Task text input
 * - Category selection with autocomplete
 * - Priority selection
 * - Due date picker
 * - Tags input
 * - Recurrence settings
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Task, Priority, Recurrence, RecurrencePattern } from '../types';
import { fromDateInputValue, toDateInputValue } from '../utils/dateUtils';

interface TaskFormProps {
  addTask: (task: Task) => void;
  existingCategories: string[];
  existingTags: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, existingCategories, existingTags }) => {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showRecurrence, setShowRecurrence] = useState(false);
  const [recurrence, setRecurrence] = useState<Recurrence | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim() === '') {
      inputRef.current?.focus();
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text: taskText.trim(),
      completed: false,
      category: category.trim() || undefined,
      priority,
      createdAt: Date.now(),
      dueDate: fromDateInputValue(dueDate),
      tags: tags.length > 0 ? tags : undefined,
      recurrence: showRecurrence ? recurrence : undefined,
      order: Date.now(),
    };

    addTask(newTask);
    
    // Reset form
    setTaskText('');
    setCategory('');
    setPriority('medium');
    setDueDate('');
    setTags([]);
    setTagInput('');
    setShowRecurrence(false);
    setRecurrence(undefined);
    setIsExpanded(false);
    
    // Announce to screen readers
    const announcement = document.getElementById('form-announcement');
    if (announcement) {
      announcement.textContent = `Task "${newTask.text}" added successfully`;
    }
    
    inputRef.current?.focus();
  }, [taskText, category, priority, dueDate, tags, showRecurrence, recurrence, addTask]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target === inputRef.current) {
      if (!isExpanded) {
        handleSubmit(e);
      }
    }
  };

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }, [tags]);

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  const handleRecurrenceChange = (pattern: RecurrencePattern) => {
    setRecurrence({
      pattern,
      interval: 1,
    });
  };

  const priorityConfig = {
    low: {
      label: 'Low',
      activeClass: 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-200 dark:shadow-emerald-900/50',
      inactiveClass: 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30',
    },
    medium: {
      label: 'Medium',
      activeClass: 'bg-amber-500 text-white border-amber-500 shadow-amber-200 dark:shadow-amber-900/50',
      inactiveClass: 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30',
    },
    high: {
      label: 'High',
      activeClass: 'bg-rose-500 text-white border-rose-500 shadow-rose-200 dark:shadow-rose-900/50',
      inactiveClass: 'bg-white dark:bg-gray-700 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30',
    },
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="mb-8 p-5 sm:p-6 rounded-2xl shadow-lg 
        bg-white dark:bg-gray-800 
        border border-gray-100 dark:border-gray-700
        transition-all duration-300"
      aria-label="Add new task"
    >
      {/* Screen reader announcement */}
      <div id="form-announcement" className="sr-only" aria-live="polite" aria-atomic="true" />
      
      {/* Main task input */}
      <div className="mb-4">
        <label htmlFor="task-input" className="sr-only">Task description</label>
        <input
          ref={inputRef}
          id="task-input"
          type="text"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsExpanded(true)}
          className="w-full p-4 text-lg sm:text-xl rounded-xl
            border-2 border-gray-200 dark:border-gray-600
            focus:border-primary dark:focus:border-primary-light
            focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary-light/20
            focus:outline-none
            bg-gray-50 dark:bg-gray-700/50 
            text-gray-800 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            transition-all duration-200"
          aria-describedby="task-hint"
        />
        <p id="task-hint" className="sr-only">Enter your task description. Press Enter to add quickly or expand for more options.</p>
      </div>

      {/* Expandable options */}
      <div className={`space-y-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        
        {/* Category and Due Date row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category input */}
          <div>
            <label htmlFor="category-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Category
            </label>
            <input
              id="category-input"
              type="text"
              placeholder="e.g., Work, Personal, Shopping"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="categories-datalist"
              className="w-full p-3 rounded-xl
                border-2 border-gray-200 dark:border-gray-600
                focus:border-primary dark:focus:border-primary-light
                focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20
                focus:outline-none
                bg-gray-50 dark:bg-gray-700/50 
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                transition-all duration-200"
            />
            <datalist id="categories-datalist">
              {existingCategories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>

          {/* Due date input */}
          <div>
            <label htmlFor="due-date-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              id="due-date-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={toDateInputValue(Date.now())}
              className="w-full p-3 rounded-xl
                border-2 border-gray-200 dark:border-gray-600
                focus:border-primary dark:focus:border-primary-light
                focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20
                focus:outline-none
                bg-gray-50 dark:bg-gray-700/50 
                text-gray-800 dark:text-gray-100
                transition-all duration-200
                [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>
        </div>

        {/* Priority selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Task priority">
            {(Object.keys(priorityConfig) as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 
                  transition-all duration-200 shadow-sm
                  ${priority === p 
                    ? priorityConfig[p].activeClass + ' shadow-md' 
                    : priorityConfig[p].inactiveClass
                  }`}
                role="radio"
                aria-checked={priority === p}
              >
                {priorityConfig[p].label}
              </button>
            ))}
          </div>
        </div>

        {/* Tags input */}
        <div>
          <label htmlFor="tags-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 p-3 rounded-xl
            border-2 border-gray-200 dark:border-gray-600
            focus-within:border-primary dark:focus-within:border-primary-light
            focus-within:ring-2 focus-within:ring-primary/20 dark:focus-within:ring-primary-light/20
            bg-gray-50 dark:bg-gray-700/50
            transition-all duration-200"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
                  bg-primary/10 dark:bg-primary-light/20 
                  text-primary-dark dark:text-primary-light
                  border border-primary/30 dark:border-primary-light/30"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-red-500 transition-colors"
                  aria-label={`Remove tag ${tag}`}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
            <input
              id="tags-input"
              type="text"
              placeholder={tags.length === 0 ? "Add tags (press Enter or comma)" : "Add more..."}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={handleAddTag}
              list="tags-datalist"
              className="flex-1 min-w-[150px] p-1 bg-transparent border-none 
                focus:outline-none text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500"
            />
            <datalist id="tags-datalist">
              {existingTags.filter(t => !tags.includes(t)).map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Recurrence toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowRecurrence(!showRecurrence)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 
              hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform ${showRecurrence ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Make this a recurring task
          </button>
          
          {showRecurrence && (
            <div className="mt-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-700/50 space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Repeat
              </label>
              <div className="flex flex-wrap gap-2">
                {(['daily', 'weekly', 'monthly', 'yearly'] as RecurrencePattern[]).map((pattern) => (
                  <button
                    key={pattern}
                    type="button"
                    onClick={() => handleRecurrenceChange(pattern)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize
                      transition-all duration-200
                      ${recurrence?.pattern === pattern
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
              {recurrence && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Every</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={recurrence.interval}
                    onChange={(e) => setRecurrence({ ...recurrence, interval: parseInt(e.target.value) || 1 })}
                    className="w-16 p-1 rounded-lg border border-gray-300 dark:border-gray-500 
                      bg-white dark:bg-gray-600 text-center"
                  />
                  <span>{recurrence.pattern === 'daily' ? 'day(s)' : recurrence.pattern === 'weekly' ? 'week(s)' : recurrence.pattern === 'monthly' ? 'month(s)' : 'year(s)'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <button
          type="submit"
          className="flex-1 sm:flex-none px-8 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-primary to-primary-dark
            hover:from-primary-dark hover:to-primary
            text-white shadow-lg shadow-primary/30
            hover:shadow-xl hover:shadow-primary/40
            focus:outline-none focus:ring-4 focus:ring-primary/30
            transform hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200"
        >
          Add Task
        </button>
        {isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="px-6 py-3 rounded-xl font-medium
              bg-gray-100 dark:bg-gray-700 
              text-gray-600 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-600
              transition-all duration-200"
          >
            Collapse
          </button>
        )}
      </div>
    </form>
  );
};

export default React.memo(TaskForm);
