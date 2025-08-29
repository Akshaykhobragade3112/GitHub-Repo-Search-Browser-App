# GitHub Repository Search App

A full-stack web application to search GitHub repositories by keyword.
The backend fetches data from GitHub’s API, while the frontend provides a clean UI to search and display repositories.

## Features:

Search GitHub repositories by keyword

Backend API handles fetching and caching results

Display repository details:

Repository name (clickable link)

Description

Stars ⭐

Programming language

Clear results automatically when input is empty

Responsive UI (works on desktop & mobile)

## Tech Stack:
### Frontend:

React (Vite)

Axios

TailwindCSS / Custom CSS

### Backend:

Node.js

Express.js

Axios (for GitHub API calls)

## Project Structure:
```bash
github-search-app/
│── backend/
│   ├── index.js       # Express backend
│   ├── package.json
│
│── frontend/
│   ├── src/
│   │   ├── App.jsx     # Main React component
│   │   ├── api.js      # Axios instance
│   │   ├── main.jsx    # Entry point
│   │   ├── App.css     # Component styles
│   │   └── index.css   # Global styles
│   ├── package.json
│
│── README.md
```
## Installation & Setup:

### 1. Clone Repository:
```bash
git clone https://github.com/your-username/github-search-app.git
cd github-search-app

```


### 2. Backend Setup (Node.js + Express):
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
```

Run backend :
```bash
node server.js
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup (React + Vite):
```bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install
```

### 4. Run the Project:
Start backend:
```bash
cd backend
node index.js
```

Start frontend:
```bsh
cd frontend
npm run dev
```

Frontend runs on: http://localhost:5173

## Usage:

Open http://localhost:5173

Enter a keyword (e.g., react, node, django)

Click Search

Browse repository results

Clear input then results reset automatically


## Deployed Link:
live link - https://github-repo-search-browser-app.onrender.com/


