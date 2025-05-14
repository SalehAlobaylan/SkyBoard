// src/config/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Optionally, you can add databaseURL or other config here
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };