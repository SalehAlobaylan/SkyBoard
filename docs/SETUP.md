# SkyBoard Setup Guide

This document provides step-by-step instructions for setting up the SkyBoard application.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Firebase account

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore database
3. Set up Authentication with Google provider
4. Get your Firebase configuration (Web API Key, Auth Domain, etc.)

## Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in the Firebase configuration values in the `.env` file
3. Configure OAuth credentials in the Google Cloud Console

## Application Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firestore Structure

The application uses the following Firestore collections:

### Users Collection

```
users/{userId}
  - displayName: string
  - email: string
  - photoURL: string
  - createdAt: timestamp
  - lastLogin: timestamp
  - settings: object
```

### Tasks Collection

```
tasks/{taskId}
  - title: string
  - description: string
  - status: string (pending, in-progress, completed)
  - priority: string (low, medium, high)
  - userId: string
  - createdAt: timestamp
  - updatedAt: timestamp
  - dueDate: timestamp
  - tags: array
```

## Deployment

1. Build the application for production:
   ```
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```
   firebase deploy
   ```
