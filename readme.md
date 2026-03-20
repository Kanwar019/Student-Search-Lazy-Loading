# Student Search Application with Lazy Loading

A responsive Single Page Application (SPA) built with React.js and a custom Node.js/Express backend. This project implements a highly optimized search bar featuring lazy loading, debouncing, and a custom mock database.

## Live Demo
* Frontend (Vercel): https://student-search-lazy-loading.vercel.app/
* Backend (Render): https://student-search-lazy-loading.onrender.com

## Key Features & Optimizations

* **Lazy Loading:** The API call is strictly conditionally triggered. The search function requires a minimum of 3 characters before executing, saving bandwidth and preventing useless queries for 1 or 2 letters.
* **Debouncing (Bonus):** Implemented a 400ms debounce timer using `useEffect` and `setTimeout`. This ensures the API isn't spammed on every single keystroke, waiting until the user pauses typing before fetching data.
* **Text Highlighting (Bonus):** The search dropdown visually highlights the matching substring within the student's name, utilizing regex with special character escaping to prevent crashes.
* **Case-Insensitive Searching:** The backend safely converts queries and database entries to lowercase before matching, ensuring `jas` successfully finds `Jaspreet`.
* **NoSQL-Free Mock Database:** Per the assignment constraints, the backend serves data from a local JSON file synchronously loaded into memory, functioning as an ultra-fast REST API without external DB dependencies.
* **Responsive UI/UX:** A clean, minimalist "glassmorphism" interface built with pure CSS. It gracefully adapts to mobile devices by restructuring the flexbox layouts.

## Tech Stack
* **Frontend:** React.js (Vite), CSS3, Lucide React (Icons)
* **Backend:** Node.js, Express.js, CORS
* **Database:** Local JSON File

---

## 💻 Local Setup Instructions

To run this project locally, you will need to run both the backend server and the frontend development server simultaneously in two separate terminals.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/Kanwar019/Student-Search-Lazy-Loading.git](https://github.com/Kanwar019/Student-Search-Lazy-Loading.git)
cd Student-Search-Lazy-Loading