# Student Search SPA

A Single Page Application (SPA) built with React.js and Node.js that implements an optimized, lazy-loaded search bar.

## Features Implemented
* **Lazy Loading / Min Characters:** The search only fires when the user has typed at least 3 characters.
* **Debouncing:** API calls are delayed by 400ms after the user stops typing to prevent unnecessary network requests and backend overload.
* **Result Limiting:** The backend only returns a maximum of 5 students to optimize network payload.
* **Text Highlighting (Bonus):** Matches in the search dropdown are visually highlighted.
* **Special Character Handling:** The search and highlighter safely handle special characters using regex escaping.
* **No Database:** Uses a local JSON file to serve REST API data as requested.

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install