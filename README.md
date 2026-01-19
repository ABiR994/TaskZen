# TaskZen: Focus-Driven To-Do App

![TaskZen Logo](https://ABiR994.github.io/TaskZen/logo.svg)

## Live Demo
Experience TaskZen live on GitHub Pages: [https://ABiR994.github.io/TaskZen](https://ABiR994.github.io/TaskZen)

## Description
TaskZen is a modern, minimalistic to-do application built with React and Tailwind CSS. It's designed to help users manage tasks with a focus on productivity and mental calm, offering a premium and intuitive user experience.

---

## Features
- **Task Management**: Add, edit, delete, and mark tasks as complete.
- **Categorization & Priority**: Organize tasks with custom categories and priority levels (low, medium, high).
- **Focus Mode**: Hide completed tasks to concentrate on pending items.
- **Smart Suggestions**: Get category suggestions based on previous entries.
- **Dynamic Theming**: Seamless dark and light mode transitions.
- **Intuitive UI/UX**: Minimalist, responsive design with a calming aesthetic, custom typography, and subtle micro-interactions.
- **Local Persistence**: All data is saved securely in your browser's local storage.

---

## Technologies Used
-   **Frontend**: React.js
-   **Styling**: Tailwind CSS
-   **State Management**: React Hooks
-   **Local Persistence**: Browser `localStorage`

---

## Installation & Local Development
To run TaskZen locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ABiR994/TaskZen.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd TaskZen
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

---

## Usage
TaskZen provides a straightforward way to manage your tasks:
-   **Add Tasks**: Use the input field, optionally adding a category and priority.
-   **Mark Complete**: Click the checkbox next to a task.
-   **Edit Tasks**: Use the pencil icon (✏️) to modify task details.
-   **Delete Tasks**: Use the trash can icon (🗑️) to remove a task.
-   **Toggle Theme**: Switch between dark and light mode using the sun (☀️) or moon (🌙) icon.
-   **Focus Mode**: Activate "Focus On" to hide all completed tasks.

---

## Deployment
This project is automatically deployed to GitHub Pages using the `gh-pages` package.
The deployment process is configured via `npm run deploy` script in `package.json`, which first builds the React application and then pushes the static assets from the `build` directory to the `gh-pages` branch.

---

## Contributing
Contributions are welcome! If you have suggestions for improving TaskZen, please feel free to:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements
This project was developed using Opencode.
Special thanks to the open-source community for the tools and libraries that made this project possible.
