<div align="center">

# TaskZen: Focus-Driven Task Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FABiR994%2FTaskZen)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

![TaskZen Logo](public/logo.svg)

A modern, feature-rich task management application built with React and TypeScript.

[Live Demo](https://task-zen-topaz.vercel.app/) | [Report Bug](https://github.com/ABiR994/TaskZen/issues) | [Request Feature](https://github.com/ABiR994/TaskZen/issues)

</div>

---

## 🌟 Overview

TaskZen is a productivity-focused to-do application designed to help you manage tasks with clarity and calm. Built with modern web technologies, it offers a premium user experience with powerful features—while maintaining simplicity and elegance.

Whether you're tackling daily chores or managing complex projects, TaskZen adapts to your workflow with smart organization, intuitive interactions, and a serene interface that reduces cognitive load.

---

## ✨ Features

### Core Task Management
- **Create, Edit, Delete Tasks** – Full CRUD operations with inline editing  
- **Priority Levels** – Organize by Low, Medium, or High priority with color coding  
- **Categories** – Group tasks with custom categories and smart autocomplete  
- **Due Dates** – Set deadlines with visual overdue indicators  
- **Tags** – Add multiple tags for flexible organization  

### Advanced Features
- **Subtasks** – Break down tasks into smaller, trackable subtasks with progress indicators  
- **Recurring Tasks** – Set up daily, weekly, monthly, or yearly recurring tasks  
- **Drag & Drop** – Reorder tasks with intuitive drag-and-drop functionality  
- **Search** – Quickly find tasks by text, category, or tags (`Ctrl+F`)  
- **Multiple Sort Options** – Sort by date, priority, due date, or custom order  
- **Export/Import** – Backup and restore tasks in JSON or CSV format  

### User Experience
- **Dark & Light Mode** – Beautiful themes with smooth transitions  
- **Focus Mode** – Hide completed tasks to concentrate on what matters  
- **Progress Tracking** – Visual progress bar showing completion percentage  
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile  
- **Local Persistence** – All data saved securely in browser `localStorage`  

### Accessibility
- **Keyboard Navigation** – Full keyboard support with intuitive shortcuts  
- **Screen Reader Support** – ARIA labels and live announcements  
- **Focus Management** – Proper focus handling for modals and interactions  
- **Skip Links** – Quick navigation for keyboard users  

---

## ⌨️ Keyboard Shortcuts

| Shortcut        | Action                          |
|-----------------|---------------------------------|
| `?`             | Show keyboard shortcuts help     |
| `D`             | Toggle dark/light mode          |
| `F`             | Toggle focus mode               |
| `Ctrl+F`        | Focus search input              |
| `Esc`           | Clear search / Close modal      |
| `Arrow Keys`    | Navigate task list              |
| `J` / `K`       | Navigate down/up (Vim-style)    |
| `X`             | Toggle task completion          |
| `E`             | Edit selected task              |
| `Shift+Delete`  | Delete selected task            |

---

## 🛠 Tech Stack

| Category         | Technology                     |
|------------------|--------------------------------|
| **Language**     | TypeScript                     |
| **Framework**    | React 18                       |
| **Styling**      | Tailwind CSS 3                 |
| **Drag & Drop**  | [@dnd-kit](https://dndkit.com/)|
| **Build Tool**   | Create React App               |
| **Deployment**   | Vercel                         |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx      # Task creation form with all input fields
│   ├── TaskItem.tsx      # Individual task display with subtasks
│   └── TaskList.tsx      # Searchable, sortable task list
├── hooks/
│   ├── useKeyboardNavigation.ts  # Keyboard navigation logic
│   ├── useFocusManagement.ts     # Focus and announcements
│   └── index.ts
├── types/
│   └── index.ts          # TypeScript interfaces and types
├── utils/
│   ├── localStorage.ts   # Type-safe storage utilities
│   ├── dateUtils.ts      # Date formatting helpers
│   └── exportImport.ts   # JSON/CSV export and import
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
└── index.css             # Global styles and Tailwind config
```

---

## 🚀 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ABiR994/TaskZen.git
   cd TaskZen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📖 Usage Guide

### Creating Tasks
1. Enter your task in the main input field
2. Click the input to expand additional options:
   - Set a category (with autocomplete from existing categories)
   - Choose priority level (Low, Medium, High)
   - Set a due date
   - Add tags (press Enter or comma to add)
   - Configure recurrence for repeating tasks
3. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox to toggle completion
- **Edit**: Hover and click the edit icon, or press `E` when focused
- **Delete**: Hover and click the delete icon, or press `Shift+Delete`
- **Reorder**: Drag tasks using the grip handle on the left
- **Subtasks**: Click the subtask icon to add and manage subtasks

### Organizing Tasks
- **Search**: Use the search bar or press `Ctrl+F` to find tasks
- **Sort**: Choose from multiple sort options (date, priority, due date, custom)
- **Filter**: Enable Focus Mode to hide completed tasks

### Data Management
- **Export**: Click the export button to download tasks as JSON or CSV
- **Import**: Upload a previously exported JSON file to restore tasks

---

## ⚙️ Configuration

### Tailwind Theme
The color palette and theme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#00b4d8',
    light: '#90e0ef',
    dark: '#0096c7',
  },
  accent: {
    DEFAULT: '#10b981',
    light: '#6ee7b7',
    dark: '#059669',
  },
}
```

---

## 🙏 Acknowledgements

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Drag and drop powered by [@dnd-kit](https://dndkit.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Font: [Inter](https://fonts.google.com/specimen/Inter)
- Developed using [OpenCode](https://opencode.ai/)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**TaskZen** - Your zen-like task manager 🧘‍♂️

[Live Demo](https://task-zen-topaz.vercel.app/)

</div>
