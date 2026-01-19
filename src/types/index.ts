/**
 * Type definitions for TaskZen application
 */

// Priority levels for tasks
export type Priority = 'low' | 'medium' | 'high';

// Recurrence patterns for recurring tasks
export type RecurrencePattern = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

// Recurrence configuration
export interface Recurrence {
  pattern: RecurrencePattern;
  interval: number; // e.g., every 2 days, every 3 weeks
  endDate?: number; // Optional end date for recurrence
  daysOfWeek?: number[]; // For weekly: 0=Sunday, 1=Monday, etc.
  dayOfMonth?: number; // For monthly/yearly
}

// Subtask interface
export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// Main Task interface
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
  priority: Priority;
  createdAt: number;
  dueDate?: number;
  tags?: string[];
  subtasks?: Subtask[];
  recurrence?: Recurrence;
  order?: number; // For drag-and-drop ordering
  completedAt?: number; // When the task was completed
  isRecurringInstance?: boolean; // If this task was generated from a recurring task
  parentRecurringId?: string; // ID of the parent recurring task
}

// Form data for creating/editing tasks
export interface TaskFormData {
  text: string;
  category: string;
  priority: Priority;
  dueDate: string;
  tags: string[];
  recurrence?: Recurrence;
}

// Export/Import data structure
export interface ExportData {
  version: string;
  exportedAt: number;
  tasks: Task[];
  settings: AppSettings;
}

// Application settings
export interface AppSettings {
  theme: 'light' | 'dark';
  focusMode: boolean;
}

// Sort options
export type SortOption = 'createdAt' | 'dueDate' | 'priority' | 'alphabetical' | 'custom';

// Filter options
export interface FilterOptions {
  showCompleted: boolean;
  priority?: Priority;
  category?: string;
  tags?: string[];
  hasDueDate?: boolean;
  overdue?: boolean;
}
