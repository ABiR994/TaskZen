/**
 * TaskList Component
 * Displays a filterable, sortable, and searchable list of tasks with:
 * - Search functionality
 * - Drag-and-drop reordering
 * - Keyboard navigation
 * - Focus management
 * - Empty state handling
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task, Subtask, SortOption } from '../types';
import TaskItem from './TaskItem';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface TaskListProps {
  tasks: Task[];
  isFocusMode: boolean;
  toggleComplete: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (task: Task) => void;
  reorderTasks: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isFocusMode,
  toggleComplete,
  deleteTask,
  editTask,
  reorderTasks,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortAscending, setSortAscending] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter tasks based on focus mode and search
  const filteredTasks = useMemo(() => {
    let result = isFocusMode ? tasks.filter(task => !task.completed) : tasks;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.text.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query) ||
        task.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [tasks, isFocusMode, searchQuery]);

  // Sort tasks
  const sortedTasks = useMemo(() => {
    const sorted = [...filteredTasks].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'createdAt':
          comparison = b.createdAt - a.createdAt;
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = a.dueDate - b.dueDate;
          break;
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'alphabetical':
          comparison = a.text.localeCompare(b.text);
          break;
        case 'custom':
          comparison = (a.order || 0) - (b.order || 0);
          break;
      }
      
      return sortAscending ? -comparison : comparison;
    });
    
    return sorted;
  }, [filteredTasks, sortBy, sortAscending]);

  // Handle subtask operations
  const handleToggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.subtasks) return;
    
    const updatedSubtasks = task.subtasks.map(s =>
      s.id === subtaskId ? { ...s, completed: !s.completed } : s
    );
    
    editTask({ ...task, subtasks: updatedSubtasks });
  }, [tasks, editTask]);

  const handleAddSubtask = useCallback((taskId: string, subtask: Subtask) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const updatedSubtasks = [...(task.subtasks || []), subtask];
    editTask({ ...task, subtasks: updatedSubtasks });
  }, [tasks, editTask]);

  const handleDeleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.subtasks) return;
    
    const updatedSubtasks = task.subtasks.filter(s => s.id !== subtaskId);
    editTask({ ...task, subtasks: updatedSubtasks });
  }, [tasks, editTask]);

  // Handle drag end
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sortedTasks.findIndex(t => t.id === active.id);
      const newIndex = sortedTasks.findIndex(t => t.id === over.id);
      
      const newOrder = arrayMove(sortedTasks, oldIndex, newIndex);
      const updatedTasks = newOrder.map((task, index) => ({
        ...task,
        order: index,
      }));
      
      reorderTasks(updatedTasks);
      setSortBy('custom');
    }
  }, [sortedTasks, reorderTasks]);

  // Keyboard navigation
  const { containerRef, getItemProps } = useKeyboardNavigation({
    itemCount: sortedTasks.length,
    onToggleComplete: (index) => toggleComplete(sortedTasks[index].id),
    onDelete: (index) => deleteTask(sortedTasks[index].id),
    isEnabled: true,
  });

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'custom', label: 'Custom Order' },
  ];

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
          bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Add your first task above to get started with TaskZen
        </p>
      </div>
    );
  }

  // No results state
  if (sortedTasks.length === 0) {
    return (
      <div>
        {/* Search bar */}
        <SearchAndSort
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAscending={sortAscending}
          setSortAscending={setSortAscending}
          sortOptions={sortOptions}
          searchInputRef={searchInputRef}
          taskCount={filteredTasks.length}
          totalCount={tasks.length}
        />
        
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full 
            bg-gray-100 dark:bg-gray-800 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
            No matching tasks
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? `No tasks match "${searchQuery}"` : 'All tasks are completed'}
          </p>
          {isFocusMode && (
            <p className="text-sm text-primary dark:text-primary-light mt-2">
              Focus mode is on - completed tasks are hidden
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search and sort controls */}
      <SearchAndSort
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortAscending={sortAscending}
        setSortAscending={setSortAscending}
        sortOptions={sortOptions}
        searchInputRef={searchInputRef}
        taskCount={filteredTasks.length}
        totalCount={tasks.length}
      />

      {/* Keyboard navigation hint */}
      <p className="sr-only" id="keyboard-hint">
        Use arrow keys to navigate tasks, x to toggle complete, e to edit, Shift+Delete to delete
      </p>

      {/* Task list with drag and drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedTasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={containerRef}
            role="list"
            aria-label="Task list"
            aria-describedby="keyboard-hint"
            className="space-y-3"
          >
            {sortedTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
                editTask={editTask}
                onToggleSubtask={handleToggleSubtask}
                onAddSubtask={handleAddSubtask}
                onDeleteSubtask={handleDeleteSubtask}
                {...getItemProps(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Task count summary */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
        </p>
      </div>
    </div>
  );
};

// Search and Sort Controls Component
interface SearchAndSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  sortAscending: boolean;
  setSortAscending: (asc: boolean) => void;
  sortOptions: { value: SortOption; label: string }[];
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  taskCount: number;
  totalCount: number;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
  sortOptions,
  searchInputRef,
  taskCount,
  totalCount,
}) => (
  <div className="mb-6 space-y-4">
    {/* Search input */}
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks... (Ctrl+F)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl
          border-2 border-gray-200 dark:border-gray-700
          focus:border-primary dark:focus:border-primary-light
          focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20
          focus:outline-none
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          transition-all duration-200"
        aria-label="Search tasks"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>

    {/* Sort controls and count */}
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-gray-600 dark:text-gray-400">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 py-1.5 rounded-lg text-sm
            border border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-primary/30 focus:outline-none
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-300"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setSortAscending(!sortAscending)}
          className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-600
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={sortAscending ? 'Sort descending' : 'Sort ascending'}
        >
          <svg 
            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${sortAscending ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <span className="text-sm text-gray-500 dark:text-gray-400">
        {searchQuery 
          ? `${taskCount} of ${totalCount} tasks`
          : `${taskCount} task${taskCount !== 1 ? 's' : ''}`
        }
      </span>
    </div>
  </div>
);

export default React.memo(TaskList);
