<div align="center">

# TaskZen: Focus-Driven Task Manager

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-f1c40f.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Deploy: Vercel](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=flat-square&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FABiR994%2FTaskZen)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://task-zen-topaz.vercel.app/) | [Report Bug](https://github.com/ABiR994/TaskZen/issues) | [Request Feature](https://github.com/ABiR994/TaskZen/issues)

<br />

<img src="public/logo.svg" alt="TaskZen Logo" width="120" />

### *Your zen-like task manager for focused productivity.*

</div>

---

## 🌟 Overview

**TaskZen** is a high-performance, productivity-first task manager designed to eliminate clutter and foster deep focus. Built with **React 18** and **TypeScript**, it combines a professional-grade feature set with a serene, glassmorphic interface that adapts to your workflow.

Whether you're managing complex engineering projects or daily personal goals, TaskZen provides the tools you need—**subtasks, recurring logic, and accessibility-first design**—to stay organized without the cognitive load of traditional managers.

---

## ✨ Features

### 🎯 Core Task Management
- **Full CRUD Workflow** – Create, edit, and manage tasks with seamless inline interactions.
- **Priority Intelligence** – Color-coded priority levels (High, Medium, Low) for instant visual triage.
- **Smart Categories** – Dynamic grouping with intelligent autocomplete suggestions.
- **Precision Deadlines** – Set due dates with visual urgency indicators and overdue alerts.
- **Tagging System** – Multi-tag support for cross-functional organization.

### 🚀 Advanced Productivity
- **Subtask Nesting** – Deconstruct complex goals into actionable steps with granular progress tracking.
- **Recurring Engine** – Automated task generation for Daily, Weekly, Monthly, or Yearly routines.
- **Fluid Reordering** – Professional drag-and-drop functionality powered by `@dnd-kit`.
- **Global Search** – High-speed filtering by text, tags, or categories (`Ctrl+F`).
- **Data Portability** – Enterprise-ready Export/Import in **JSON** and **CSV** formats.

### 🎨 Premium Experience
- **Adaptive Themes** – Elegant Dark and Light modes with system-matching transitions.
- **Focus Mode** – A minimalist view that silences completed tasks to keep you on target.
- **Visual Analytics** – Real-time progress bars and completion statistics.
- **Responsive Architecture** – Optimized for Mobile, Tablet, and Desktop environments.
- **Secure Persistence** – Local-first data strategy using encrypted-ready browser storage.

### ♿ Accessibility-First
- **Full Keyboard Mastery** – Navigate the entire app without a mouse via intuitive shortcuts.
- **Screen Reader Optimized** – Robust ARIA implementations and live region announcements.
- **Focus Logic** – Intelligent focus trapping and management for a seamless navigation flow.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `?` | Show/Hide keyboard help |
| `D` | Toggle Dark/Light mode |
| `F` | Toggle Focus Mode |
| `Ctrl + F` | Jump to search input |
| `Esc` | Clear search / Close modals |
| `Arrow Keys` | Navigate through task list |
| `J` / `K` | Vim-style navigation (Down / Up) |
| `X` | Toggle task completion |
| `E` | Edit highlighted task |
| `Shift + Del` | Delete highlighted task |

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 3, PostCSS |
| **State** | React Hooks (Context, Memo, Callbacks) |
| **Drag & Drop** | @dnd-kit/core, @dnd-kit/sortable |
| **Icons** | Heroicons (SVG) |
| **Build** | Create React App, Webpack |
| **Deployment** | Vercel (CI/CD) |

---

## 📂 Project Structure

```text
TaskZen/
├── public/                 # Static assets and PWA configuration
│   ├── logo.svg            # Primary branding asset
│   ├── manifest.json       # App manifest for PWA support
│   └── index.html          # Main HTML entry
├── src/
│   ├── components/         # Atomic and composite UI components
│   │   ├── TaskForm.tsx    # Intelligent task entry system
│   │   ├── TaskItem.tsx    # Individual task component (Subtasks, Actions)
│   │   └── TaskList.tsx    # Optimized list with DND integration
│   ├── hooks/              # Custom business logic and navigation hooks
│   │   ├── useKeyboard.ts  # Shortcut handling engine
│   │   └── useFocus.ts     # Accessibility focus management
│   ├── types/              # Global TypeScript definitions
│   ├── utils/              # Pure functions and storage helpers
│   │   ├── storage.ts      # LocalStorage abstraction
│   │   └── export.ts       # CSV/JSON serialization logic
│   ├── App.tsx             # Root container and state orchestration
│   └── index.css           # Tailwind directives and global styles
├── tailwind.config.js      # Custom theme and design system
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16.x or higher)
- **npm** or **yarn**

### Installation

1. **Clone the Source**
   ```bash
   git clone https://github.com/ABiR994/TaskZen.git
   cd TaskZen
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development**
   ```bash
   npm start
   ```
   *Navigate to `http://localhost:3000` to view the app.*

4. **Production Build**
   ```bash
   npm run build
   ```

---

## 🙏 Acknowledgements

TaskZen is made possible by the incredible open-source community and the following projects:

- **[React](https://reactjs.org/)** – The backbone of our component architecture.
- **[Tailwind CSS](https://tailwindcss.com/)** – For providing a flexible and robust utility-first design system.
- **[DND Kit](https://dndkit.com/)** – For the performant and accessible drag-and-drop primitives.
- **[Heroicons](https://heroicons.com/)** – For the beautiful, consistent SVG iconography.
- **[Inter Font](https://rsms.me/inter/)** – The primary typeface for high-readability UI.
- **[Google DeepMind](https://deepmind.google/)** – For the Advanced Agentic Coding tools (Antigravity/OpenCode) used during development.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for the full text.

---

<div align="center">

**TaskZen** – Built for focus. Designed for you.

[Back to Top](#taskzen-focus-driven-task-manager)

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
