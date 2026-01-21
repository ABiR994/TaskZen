<div align="center">

# TaskZen: Focus-Driven Task Manager

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

**TaskZen** is a high-performance, productivity-first task manager designed to eliminate clutter and foster deep focus. Built with **React 18** and **TypeScript**, it combines a professional-grade feature set with a serene, minimalist interface that adapts to your workflow.

---

## 🧘 Why TaskZen?

Traditional task managers often contribute to cognitive overload with cluttered interfaces and unnecessary complexity. **TaskZen** is built on the philosophy of "Zen Productivity"—providing powerful tools through a clean, distraction-free environment.

- **Deep Work Oriented:** Focus Mode silences the noise so you can finish what you started.
- **Developer Friendly:** Intuitive keyboard shortcuts and Vim-style navigation.
- **Privacy First:** Your data stays in your browser. No accounts, no tracking.
- **Built for Scale:** Manage everything from simple list items to complex nested projects.

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
- **[Advanced Agentic Coding](https://deepmind.google/)** – Developed using Google DeepMind's agentic coding tools (Antigravity/OpenCode).

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for the full text.

---

<div align="center">

**TaskZen** - Your zen-like task manager 🧘‍♂️

[Back to Top](#taskzen-focus-driven-task-manager)

</div>

---
