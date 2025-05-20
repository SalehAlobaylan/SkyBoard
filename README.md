[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/firestore)
[![OAuth](https://img.shields.io/badge/OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://oauth.net/2/)


Quick Run the application (zip version):

```
npm run dev:full
```

# SkyBoard

SkyBoard is a modern task management application built with React and Express.

## Project Overview

The application consists of:

- Frontend: React.js application
- Backend: Express.js API with Firebase Firestore database

## Getting Started

### Installation

1. Clone the repository

```
git clone https://github.com/SalehAlobaylan/SkyBoard.git
cd SkyBoard
```

2. Install dependencies for both the frontend and backend

```
npm run install:all
```

### Running the Application

#### Option 1: Run with Real Backend

If you have Firebase credentials configured:

1. Create a `.env` file in the root directory with:

```
SESSION_SECRET=your-session-secret-key
PORT=5000
NODE_ENV=development
```

2. Run the application:

```
npm run dev:full
```

#### Option 2: Run with Mock Backend (No Firebase Required)

This option uses an in-memory mock server that doesn't require Firebase credentials.

```
npm run dev:mock
```

This will start:

- Mock backend server at http://localhost:5000
- React frontend at http://localhost:3000


## Troubleshooting

If you're experiencing "Proxy error" messages, it means the frontend is running but can't connect to the backend. Make sure to:

1. Start the backend server (real or mock) before trying to use the application
2. Check that the server is running on port 5000
3. Verify there are no conflicts with other applications using the same port

