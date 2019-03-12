const firebase = require('firebase');
// Required for side-effects
require('firebase-admin');
require("firebase/firestore");

let firebaseApp;

if (!firebaseApp) {
  firebaseApp = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_URL,
    storageBucket: process.env.FIREBASAE_STORAGE_BUCKET
  });
}

module.exports = firebaseApp;