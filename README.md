# To-Do List Pro

A fully-featured, single-page to-do list application built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies — just open `index.html` in a browser.

## Core Features (assignment requirements)
- Add task
- Edit task (click directly on the task text)
- Delete task
- Mark task as completed
- Set priority (High / Medium / Low)
- Filter tasks by status (All / Pending / Completed)

## Advanced Features
- **Due dates** with automatic overdue detection and an "Overdue" filter
- **Search** — live filter tasks by keyword
- **Sort** — by newest, priority, due date, or alphabetically
- **Drag-and-drop reordering**
- **Progress bar** showing completion percentage
- **Undo** for delete and "clear completed" actions (toast notification)
- **Export / Import** tasks as JSON (backup or transfer your list)
- **Dark / light theme toggle** (persisted across sessions)
- Fully responsive layout for mobile

## Tech Stack
- HTML5, CSS3, vanilla JavaScript (no build tools, no external libraries)
- `localStorage` for persistence (data stays in your browser, survives refresh)

## Run Locally
Just open `index.html` in any browser. No server or install needed.

## Deploy to GitHub Pages
1. Create a new GitHub repo and push these files:
   ```bash
   git init
   git add .
   git commit -m "To-do list app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to your repo → **Settings** → **Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. Your live demo will be at:
   `https://<your-username>.github.io/<repo-name>/`
   (may take 1–2 minutes to go live)

## Project Structure
```
todo-app/
├── index.html   # app markup + styling
└── README.md
```
