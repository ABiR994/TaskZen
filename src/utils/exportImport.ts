/**
 * Export/Import utilities for TaskZen
 */

import { Task, ExportData, AppSettings } from '../types';

const EXPORT_VERSION = '1.0.0';

/**
 * Exports tasks and settings to a JSON file
 */
export const exportToJSON = (tasks: Task[], settings: AppSettings): void => {
  const exportData: ExportData = {
    version: EXPORT_VERSION,
    exportedAt: Date.now(),
    tasks,
    settings,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `taskzen-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Exports tasks to CSV format
 */
export const exportToCSV = (tasks: Task[]): void => {
  const headers = ['ID', 'Text', 'Completed', 'Category', 'Priority', 'Due Date', 'Tags', 'Created At'];
  const rows = tasks.map(task => [
    task.id,
    `"${task.text.replace(/"/g, '""')}"`,
    task.completed ? 'Yes' : 'No',
    task.category || '',
    task.priority,
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    task.tags?.join('; ') || '',
    new Date(task.createdAt).toISOString(),
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `taskzen-export-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Imports tasks from a JSON file
 */
export const importFromJSON = (file: File): Promise<ExportData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ExportData;
        
        // Validate the imported data
        if (!data.version || !Array.isArray(data.tasks)) {
          throw new Error('Invalid export file format');
        }
        
        // Migrate old data format if needed
        const migratedTasks = data.tasks.map(task => ({
          ...task,
          priority: task.priority || 'medium',
          createdAt: task.createdAt || Date.now(),
        }));
        
        resolve({ ...data, tasks: migratedTasks });
      } catch (error) {
        reject(new Error('Failed to parse import file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
